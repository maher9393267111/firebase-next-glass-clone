import { atom, selector } from 'recoil';

const defaultData = [
  {
    id: 1,
    content: 'Action 1',
    status: 'new',
  },
  {
    id: 2,
    content: 'Action 2',
    status: 'inprogress',
  },
];

export const listTodoState = atom({
  key: 'listTodo',
  default: defaultData,
});

export const newListState = selector({	// newListState này sẽ chứa danh sách các action có trạng thái là new.
  key: 'newList',
  get: ({ get }) => {
    const list = get(listTodoState);	// đây là cách để lấy cả list todo đã tạo với atom ở bước trên.
    return [...list].filter((item) => item.status === 'new');	// chọn và trả về những thằng có status là new.
  },
});

export const inprogressListState = selector({	// inprogressListState này sẽ chứa danh sách các action có trạng thái là inprogress.
  key: 'inprogressList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return [...list].filter((item) => item.status === 'inprogress');
  },
  set: ({ get, set }, id) => {	// để set 1 cái hành động có id này thành trạng thái inprogress
    const list = get(listTodoState);
    set(
      listTodoState,
      list.map((item) =>
        item.id === id ? { ...item, status: 'inprogress' } : item
      )
    );
  },
});

export const completedListState = selector({	// completedListState này sẽ chứa danh sách các action có trạng thái là completed.
  key: 'completedList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return [...list].filter((item) => item.status === 'completed');
  }
});