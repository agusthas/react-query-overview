import { ApiProperty } from '@nestjs/swagger';

export class PageInfo {
  @ApiProperty()
  page: number;
  @ApiProperty({ type: Number, nullable: true })
  prevPage: number | null;
  @ApiProperty({ type: Number, nullable: true })
  nextPage: number | null;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  lastPage: number;
  @ApiProperty()
  total: number;
}
