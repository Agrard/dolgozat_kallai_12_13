import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskakDto } from './macskak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listMacskak() {
    const [rows] = await db.execute(
      'SELECT szem_szin, suly FROM macskak ORDER BY suly ASC',
    );

    return {
      macskak: rows,
    };
  }

  @Get('macskak/new')
  @Render('form')
  newMacskakForm() {
    return {};
  }

  @Post('macskak/new')
  @Redirect()
  async newMacskak(@Body() macskak: MacskakDto) {
    const []: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macskak.szem_szin, macskak.suly],
    );
    return {
      url: '/',
    };
  }
}
