// ═══════════════════════════════════════════════════════
// SOLW3 Pricing Engine
// Calcula preço e timeline baseado na modalidade e módulos
// ═══════════════════════════════════════════════════════

var PRICING_TABLE = {
  A: { nome: "Projeto Novo", base_por_modulo: 4200, semanas_por_modulo: 2 },
  B: { nome: "Refatoração", base_por_modulo: 2800, semanas_por_modulo: 1.5 },
  C: { nome: "Extensão", base_por_modulo: 1400, semanas_por_modulo: 1 },
  D: { nome: "Staff Augmentation", base_mensal: 8000, minimo_meses: 3 }
};

export function calcularPrecificacao(modalidade, modulos) {
  var config = PRICING_TABLE[modalidade];

  if (!config) {
    throw new Error("Modalidade inválida: " + modalidade);
  }

  var resultado = {
    modalidade: modalidade,
    modalidade_nome: config.nome,
    modulos: modulos
  };

  if (modalidade === "D") {
    // Staff Augmentation: preço mensal
    resultado.preco_mensal = config.base_mensal;
    resultado.preco_total = config.base_mensal * config.minimo_meses;
    resultado.timeline_meses = config.minimo_meses;
    resultado.timeline_semanas = config.minimo_meses * 4;
    resultado.timeline_display = "Mín. " + config.minimo_meses + " meses";
    resultado.formato = "mensal";
  } else {
    // Modalidades A, B, C: preço por módulo
    resultado.preco_por_modulo = config.base_por_modulo;
    resultado.preco_total = config.base_por_modulo * modulos;
    resultado.timeline_semanas = Math.ceil(config.semanas_por_modulo * modulos);
    resultado.timeline_display = formatarTimeline(resultado.timeline_semanas);
    resultado.formato = "projeto";
  }

  return resultado;
}

export function formatarPreco(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function formatarTimeline(semanas) {
  if (semanas < 4) {
    return semanas + " semana" + (semanas > 1 ? "s" : "");
  }
  var meses = Math.ceil(semanas / 4);
  return meses + " " + (meses === 1 ? "mês" : "meses");
}
