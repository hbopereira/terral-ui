import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioProdutoColaboradorComponent } from './relatorio-produto-colaborador.component';

describe('RelatorioProdutoColaboradorComponent', () => {
  let component: RelatorioProdutoColaboradorComponent;
  let fixture: ComponentFixture<RelatorioProdutoColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioProdutoColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioProdutoColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
