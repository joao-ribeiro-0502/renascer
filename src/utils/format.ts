// Utilitários de formatação de data (pt-BR).

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00`));
}

export function formatDay(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(
    new Date(`${iso}T12:00:00`)
  );
}

export function formatMonthShort(iso: string): string {
  const m = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(
    new Date(`${iso}T12:00:00`)
  );
  return m.replace('.', '').toUpperCase();
}

export function formatMonthYear(iso: string): string {
  const d = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00`));
  return d.charAt(0).toUpperCase() + d.slice(1);
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}
