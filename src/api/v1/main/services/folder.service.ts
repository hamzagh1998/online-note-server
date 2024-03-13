import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from 'src/database/models/user/user.repository';
import { FolderRepository } from 'src/database/models/folder/folder.repository';
import { GenericItemRepository } from 'src/database/models/generic-item/generic-item.repository';
import { FolderDocument } from 'src/database/models/folder/folder.schema';
import { GenericItemDocument } from 'src/database/models/generic-item/generic-item.schema';

import { CreateFolderRequestDto } from '../dto/create-folder.req';
import { Types } from 'mongoose';
import { Base } from './base';

@Injectable()
export class FolderService extends Base {
  constructor(
    public userRepo: UserRepository,
    private folderRepo: FolderRepository,
    private genericItemRepo: GenericItemRepository,
  ) {
    super(userRepo);
  }

  async getFolderDataService(email: string, gItemId: string) {
    await this.checkUser(email);
    if (this.error)
      return this.result(this.error, this.statusCode, this.detail);

    try {
      const genericItemDoc: GenericItemDocument =
        await this.genericItemRepo.findOne({
          _id: gItemId,
          owner: this.user._id,
        });

      const folderDoc: FolderDocument = await this.folderRepo.findOne({
        _id: genericItemDoc.itemId,
        owner: this.user._id,
      });

      let genericItemParentDoc: GenericItemDocument | null;
      if (folderDoc.parentDirectory)
        genericItemParentDoc = await this.genericItemRepo.findOne({
          _id: folderDoc.parentDirectory,
          owner: this.user._id,
        });

      const childrenItemsDoc: Array<GenericItemDocument> =
        await this.genericItemRepo.find({
          _id: folderDoc.children,
        });

      return this.result(false, HttpStatus.OK, {
        id: folderDoc._id,
        folderName: folderDoc.name,
        parentDirectory: genericItemParentDoc
          ? {
              id: genericItemParentDoc._id,
              name: genericItemParentDoc ? genericItemParentDoc.name : null,
            }
          : null,
        children: childrenItemsDoc,
      });
    } catch (error) {
      return this.result(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to fetch folder data!',
      );
    }
  }

  async createFolderService(payload: CreateFolderRequestDto) {
    const { user, name, password, parentDirectory } = payload;

    await this.checkUser(user.email);
    if (this.error)
      return this.result(this.error, this.statusCode, this.detail);

    try {
      const parentFolder: GenericItemDocument =
        await this.genericItemRepo.findOne({
          _id: parentDirectory,
          owner: this.user._id,
          type: 'folder',
        });

      const newFolderDoc: FolderDocument = await this.folderRepo.create({
        owner: new Types.ObjectId(this.user._id),
        name,
        password: !password ? null : await bcrypt.hash(password, 10), //hashed password
        parentDirectory: new Types.ObjectId(parentFolder._id),
      });
      const genericItemDoc: GenericItemDocument =
        await this.genericItemRepo.create({
          owner: new Types.ObjectId(this.user._id),
          name: newFolderDoc.name,
          parentDirectory: new Types.ObjectId(parentDirectory),
          isPrivate: newFolderDoc.password !== null,
          isFavorite: newFolderDoc.isFavorite,
          type: 'folder',
          itemId: new Types.ObjectId(newFolderDoc._id),
        });

      await this.folderRepo.findOneAndUpdate(
        {
          _id: parentFolder.itemId,
          owner: this.user._id,
        },
        {
          $addToSet: { children: new Types.ObjectId(genericItemDoc._id) },
        },
      );
      return await this.getFolderDataService(this.user.email, parentDirectory);
    } catch (error) {
      return this.result(false, HttpStatus.INTERNAL_SERVER_ERROR, 'Failed');
    }
  }

  // async deleteFolderService(itemId: string) {
  //   try {
  //     // const isDeleted = await this.
  //   } catch (error) {
  //     this.result(
  //       true,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       'Internal Server Error!',
  //     );
  //   }
  // }
}
