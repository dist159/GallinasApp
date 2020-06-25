import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearUsusarioPage } from './crear-ususario.page';

describe('CrearUsusarioPage', () => {
  let component: CrearUsusarioPage;
  let fixture: ComponentFixture<CrearUsusarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsusarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearUsusarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
