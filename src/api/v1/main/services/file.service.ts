import { HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { Base } from './base';

import { uploadFileRequestDto } from '../dto/create-folder.req';

import { UserDocument } from 'src/database/models/user/user.schema';
import { FileDocument } from 'src/database/models/file/file.schema';
import { GenericItemDocument } from 'src/database/models/generic-item/generic-item.schema';

import { UserRepository } from 'src/database/models/user/user.repository';
import { FileRepository } from 'src/database/models/file/file.repository';
import { GenericItemRepository } from 'src/database/models/generic-item/generic-item.repository';
import { FolderRepository } from 'src/database/models/folder/folder.repository';
import { FolderDocument } from 'src/database/models/folder/folder.schema';

@Injectable()
export class FileService extends Base {
  constructor(
    public userRepo: UserRepository,
    private fileRepo: FileRepository,
    private folderRepo: FolderRepository,
    private genericItemRepo: GenericItemRepository,
  ) {
    super(userRepo);
  }

  async uploadFileService(payload: uploadFileRequestDto) {
    const rslt = await this.checkUser(payload.user.email);
    if (rslt.error) {
      return this.result(rslt.error, this.statusCode, this.detail);
    }

    const userDoc = rslt.detail as UserDocument;

    try {
      // create File document
      const newFileDoc = await this.createFileDocument(userDoc, payload);
      // create GenericItme document
      const genericItemDoc = await this.createGenericItemDocument(
        userDoc,
        newFileDoc,
        payload.parentDirectory,
      );
      await this.addToFolderDocument(
        genericItemDoc.parentDirectory,
        genericItemDoc._id,
      );
      return this.result(false, HttpStatus.CREATED, 'File saved successfully');
    } catch (error) {
      return this.result(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error occurred while saving file data!',
      );
    }
  }

  private async createFileDocument(
    userDoc: UserDocument,
    payload: uploadFileRequestDto,
  ): Promise<FileDocument> {
    const { name, ressourceLink, fileType, extension, fileSizeMB } = payload;
    return await this.fileRepo.create({
      owner: userDoc._id,
      name,
      ressourceLink,
      fileType,
      extension,
      fileSizeMB,
    });
  }

  private async createGenericItemDocument(
    userDoc: UserDocument,
    newFileDoc: FileDocument,
    parentDirectory: string,
  ): Promise<GenericItemDocument> {
    const { name, fileType } = newFileDoc;
    return await this.genericItemRepo.create({
      owner: userDoc._id,
      name,
      parentDirectory: new Types.ObjectId(parentDirectory),
      type: 'file',
      fileType,
      itemId: newFileDoc._id,
    });
  }

  private async addToFolderDocument(
    GenericItemId: Types.ObjectId,
    childrenId: Types.ObjectId,
  ): Promise<FolderDocument> {
    const genericItemDoc = await this.genericItemRepo.findOne({
      _id: GenericItemId,
    }); // Parent Generic item which holde the file
    const { itemId } = genericItemDoc;
    return await this.folderRepo.findOneAndUpdate(
      { _id: itemId },
      { $addToSet: { children: childrenId } },
    );
  }
}
