import { HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/database/models/user/user.repository';
// import { CreateFolderRequestDto } from '../dto/create-folder.req';
// import { FolderRepository } from 'src/database/models/folder/folder.repository';
// import { GenericItemRepository } from 'src/database/models/generic-item/generic-item.repository';

@Injectable()
export class FolderService {
  constructor(
    private userRepo: UserRepository,
    // folderRepo: FolderRepository,
    // genericItemRepo: GenericItemRepository,
  ) {}

  async getFolderDataService(email: string) {
    try {
      const userDoc = await this.userRepo.findOne({ email });
      if (!userDoc) {
        return {
          error: true,
          statusCode: HttpStatus.NOT_FOUND,
          detail: "User with this email doesn't exists",
        };
      }
    } catch (error) {
      return;
    }
  }

  // async createFolderService(payload: CreateFolderRequestDto) {
  //   // TODO create this service
  //   const { user, name, password, parentDirectory } = payload;
  // }
}
