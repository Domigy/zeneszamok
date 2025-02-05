import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiBadRequestResponse, ApiParam, ApiResponse } from '@nestjs/swagger';

/**
 * Controller for song
 */
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  /**
   * Creates a new song
   * 
   * @param createSongDto The data of the song
   * @returns New song add to database
   */
  @Post()
  @ApiResponse(
    {
      status: 201,
      description: 'The created song',
      type: CreateSongDto 
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  /**
   * 
   * @returns JSON response, all songs
   */
  @ApiResponse(
    {
      status: 200,
      description: 'All songs',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  @Get()
  findAll() {
    return this.songService.findAll();
  }
  /**
   * 
   * @param limit The number of song
   * @returns JSON response, top songs
   */
  @ApiParam(
    {
      name: 'limit',
      description: 'The number of song',
    }
  )
  @ApiResponse(
    {
      status: 200,
      description: 'Top songs',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  @Get('top')
  topSong(@Query('count')limit: string= '10'){
    return this.songService.topSong(+limit);
  }
  /**
   * 
   * @returns JSON response, most popular artist
   */
  @ApiResponse(
    {
      status: 200,
      description: 'The most popular artist',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  @Get('popularArtist')
  popularArtist(){
    return this.songService.popularArtist();
    
  }
  /**
   * 
   * @param id The id of the song
   * @returns JSON response, one song
   */
  @Get(':id')
  @ApiParam(
    {
      name: 'id',
      description: 'The id of the song',
      required: true,
    }
  )
  @ApiResponse(
    {
      status: 200,
      description: 'One song',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  /**
   * Modifies the data of a song
   * 
   * @param id The id of the song
   * @param updateSongDto The data of the song
   * @returns JSON response
   */
  @Patch(':id')
  @ApiParam(
    {
      name: 'id',
      description: 'The id of the song',
      required: true,
    }   
  )
  @ApiResponse(
    {
      status: 200,
      description: 'The modified song',
      type: UpdateSongDto
    }
  )
  @ApiBadRequestResponse({
  description: 'The supplied data was invalid'})
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  /**
   * 
   * @param id The id of the song
   */
  @HttpCode(201)
  @ApiParam(
    {
      name: 'id',
      description: 'The id of the song',}
  )
  @ApiResponse(
    {
      status: 201,
      description: 'The deleted song',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const eredmeny=  await this.songService.remove(+id);
    console.log(eredmeny);
    if(!eredmeny){
      throw new NotFoundException("Nincs ilyen");
    }
  }

  /**
   * 
   * @returns JSON response
   */
  @ApiResponse(
    {
      status: 200,
      description: 'All free songs',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  @Get('free')
  findFree(){
    return this.songService.findFree();
  }
  
}
