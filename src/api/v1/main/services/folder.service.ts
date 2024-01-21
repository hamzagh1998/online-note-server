import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from 'src/database/models/user/user.repository';
import { FolderRepository } from 'src/database/models/folder/folder.repository';
import { GenericItemRepository } from 'src/database/models/generic-item/generic-item.repository';
import { UserDocument } from 'src/database/models/user/user.schema';
import { FolderDocument } from 'src/database/models/folder/folder.schema';
import { GenericItemDocument } from 'src/database/models/generic-item/generic-item.schema';

import { CreateFolderRequestDto } from '../dto/create-folder.req';
import { Types } from 'mongoose';

@Injectable()
export class FolderService {
  private error: boolean = false;
  private statusCode: HttpStatus;
  private detail: string | object;

  private user: UserDocument;

  constructor(
    private userRepo: UserRepository,
    private folderRepo: FolderRepository,
    private genericItemRepo: GenericItemRepository,
  ) {}

  async getFolderDataService(email: string, gItemId: string) {
    console.log(email, gItemId);

    await this.checkUser(email);
    if (this.error)
      return {
        error: this.error,
        statusCode: this.statusCode,
        detail: this.detail,
      };

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

      return {
        error: false,
        statusCode: HttpStatus.OK,
        detail: {
          id: folderDoc._id,
          folderName: folderDoc.name,
          parentDirectory: genericItemParentDoc
            ? {
                id: genericItemParentDoc._id,
                name: genericItemParentDoc ? genericItemParentDoc.name : null,
              }
            : null,
          children: childrenItemsDoc,
        },
      };
    } catch (error) {
      return {
        error: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        detail: 'Failed to fetch folder data!',
      };
    }
  }

  async createFolderService(payload: CreateFolderRequestDto) {
    const { user, name, password, parentDirectory } = payload;

    await this.checkUser(user.email);
    if (this.error)
      return {
        error: this.error,
        statusCode: this.statusCode,
        detail: this.detail,
      };

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
      await this.getFolderDataService(this.user.email, parentDirectory);
    } catch (error) {
      return {
        error: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        detail: 'Failed',
      };
    }
  }

  private async checkUser(email: string) {
    try {
      const userDoc = await this.userRepo.findOne({ email });
      if (!userDoc) {
        this.result(
          true,
          HttpStatus.NOT_FOUND,
          "User with this email doesn't exist!",
        );
      }
      this.user = userDoc;
      this.result(false, HttpStatus.OK, userDoc);
    } catch (error) {
      this.result(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error!',
      );
    }
  }

  private result(
    error: boolean,
    statusCode: HttpStatus,
    detail: string | object,
  ) {
    this.error = error;
    this.statusCode = statusCode;
    this.detail = detail;
  }
}
