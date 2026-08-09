export const DEMO_SUBJECTS = [
  {
    id: 'sub-dbms',
    name: 'DBMS',
    deadline: '2026-08-12',
    topics: [
      { id: 't-norm', name: 'Normalization', isWeak: true },
      { id: 't-trans', name: 'Transactions', isWeak: false },
      { id: 't-index', name: 'Indexing', isWeak: false },
    ],
  },
  {
    id: 'sub-dsa',
    name: 'DSA',
    deadline: '2026-08-15',
    topics: [
      { id: 't-graphs', name: 'Graphs', isWeak: true },
      { id: 't-trees', name: 'Trees', isWeak: false },
    ],
  },
]

export const DEMO_DAILY_HOURS = 2

export function createEmptySubject() {
  return {
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: '',
    deadline: '',
    topics: [{ id: `t-${Date.now()}`, name: '', isWeak: false }],
  }
}

export function createEmptyTopic() {
  return {
    id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: '',
    isWeak: false,
  }
}
