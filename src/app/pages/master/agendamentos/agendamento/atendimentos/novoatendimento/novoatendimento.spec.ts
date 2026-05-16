import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Novoatendimento } from './novoatendimento';

describe('Novoatendimento', () => {
  let component: Novoatendimento;
  let fixture: ComponentFixture<Novoatendimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Novoatendimento],
    }).compileComponents();

    fixture = TestBed.createComponent(Novoatendimento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
