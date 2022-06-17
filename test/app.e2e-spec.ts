import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing'

import * as pactum from 'pactum'

import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';

describe('App e2e',() => {
  let app : INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
    }));
    await app.init();
    await app.listen(3333)
    prisma = app.get(PrismaService);
    await prisma.clearDb();
    pactum.request.setBaseUrl('http://localhost:3333')
  });

  afterAll(()=>{
    app.close();
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@gmail.com',
      password:'test123456'
    }
    describe('Signup', () => {
      it('should throw exeption if email empty',()=>{
        return pactum.spec().post('/auth/signup',).withBody({password:dto.password}).expectStatus(400);
      })
      it('should throw exeption if email is not email format',()=>{
        return pactum.spec().post('/auth/signup',).withBody({email:'test',password:dto.password}).expectStatus(400);
      })
      it('should throw exeption if password empty',()=>{
        return pactum.spec().post('/auth/signup',).withBody({email:dto.email}).expectStatus(400);
      })
      it('should throw exeption if body is missing',()=>{
        return pactum.spec().post('/auth/signup',).expectStatus(400);
      })
      it('should signup',()=>{
        return pactum.spec().post('/auth/signup',).withBody(dto).expectStatus(201);
      })
    });
    describe('Signin', () => {
      it('should throw exeption if email empty',()=>{
        return pactum.spec().post('/auth/signin',).withBody({password:dto.password}).expectStatus(400);
      })
      it('should throw exeption if email is not email format',()=>{
        return pactum.spec().post('/auth/signin',).withBody({email:'test',password:dto.password}).expectStatus(400);
      })
      it('should throw exeption if password empty',()=>{
        return pactum.spec().post('/auth/signin',).withBody({email:dto.email}).expectStatus(400);
      })
      it('should throw exeption if body is missing',()=>{
        return pactum.spec().post('/auth/signin',).expectStatus(400);
      })
      it('should signin', ()=>{
        return pactum.spec().post('/auth/signin',).withBody(dto).expectStatus(201);
      })
      
    });
  });
  describe('Parking', () => {
    describe('Get All', () => {
      it.todo('should Get All parkings')
    });
    describe('Get By id', () => {
      it.todo('should get parking by id')
    });
    
    
  });
  describe('Ticket', () => {
    describe('Get All', () => {
      it.todo('should Get All tickets ')
    });
    describe('Get By id', () => {
      it.todo('should Get tickets by Id')
    });
    describe('Price Check', () => {
      it.todo('should pass price check the ticket')
    });
    
  });

}) 