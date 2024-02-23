import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioComissaoVendedorComponent } from './relatorio-comissao-vendedor.component';

describe('RelatorioComissaoVendedorComponent', () => {
  let component: RelatorioComissaoVendedorComponent;
  let fixture: ComponentFixture<RelatorioComissaoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioComissaoVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioComissaoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
