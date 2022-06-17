import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing'

import * as pactum from 'pactum'

import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { EditParkingDto } from 'src/parking/dto';

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
        return pactum.spec().post('/auth/signin',).withBody(dto).expectStatus(201).stores('userAt', 'access_token');;
      })
      
    });
  });

  describe('Parking', () => {
    describe('Get empty parking', () => {
      it('should get parkings',()=>{
        return pactum.spec().get('/parkings/all',).withHeaders({Authorization:'Bearer $S{userAt}'}).expectStatus(200).expectBody([]);
      })
    });

    describe('Create parking', () => {
      const dto = {
        name: 'test',
        location: 'test location',
        availableSlots: 10,
        totalSlots: 10,
        freeLengthInMin: 1,
        pricePerHour: 10,
      
      }
      it('should create parking',()=>{
        return pactum.spec().post('/parkings',).withHeaders({Authorization:'Bearer $S{userAt}'}).withBody(dto).expectStatus(201).stores('parkingId','id');
      })
    });

    describe('Get parkings', () => {
      it('should get parkings',()=>{
        return pactum.spec().get('/parkings/all',).withHeaders({Authorization:'Bearer $S{userAt}'}).expectStatus(200).expectJsonLength(1);
      })
    });

    describe('Get parking by ID', () => {
      it('should get parking',()=>{
        return pactum.spec().get('/parkings/{id}',).withPathParams('id','$S{parkingId}').withHeaders({Authorization:'Bearer $S{userAt}'}).expectStatus(200).expectBodyContains('$S{parkingId}');
      })
    });

    describe('Edit parking by ID', () => {
      const dto: EditParkingDto = {
        name:'new name'
      }
      it('should edit parking',()=>{
        return pactum.spec().patch('/parkings/{id}',).withPathParams('id','$S{parkingId}').withBody(dto).withHeaders({Authorization:'Bearer $S{userAt}'}).expectStatus(200).expectBodyContains(dto.name);
      })
    });

    describe('Delete Parking', () => {
      it('should delete parking',()=>{
        return pactum.spec().delete('/parkings/{id}',).withPathParams('id','$S{parkingId}').withHeaders({Authorization:'Bearer $S{userAt}'}).expectStatus(204);
      })
    });
    describe('check Deleted Parking', () => {
      it('should get no parkings',()=>{
        return pactum.spec().get('/parkings/all',).withHeaders({Authorization:'Bearer $S{userAt}'}).expectStatus(200).expectJsonLength(0);
      })
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