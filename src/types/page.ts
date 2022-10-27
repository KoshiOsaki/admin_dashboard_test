export interface Page {
  route: string;
  text: string;
}

export const pages: Page[] = [
  { route: '/', text: 'ホーム' },
  { route: '/users', text: 'ユーザーリスト' },
  { route: '/crops-data', text: '固定値' },
  { route: '/chat', text: 'チャット' },
  { route: '/settings', text: '設定' },
];
