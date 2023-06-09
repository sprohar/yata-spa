import { PaginatedList } from '../interfaces';
import { Task } from '../models';

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Lorythaixoides concolor',
    description: 'Praesent lectus.',
    priority: 0,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2022-04-04T07:49:32Z',
    userId: '1',
    sectionId: 1,
    projectId: 1,
  },
  {
    id: 2,
    title: 'Halcyon smyrnesis',
    description:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    priority: 100,
    isCompleted: false,
    isAllDay: true,
    dueDate: '2023-03-18T16:43:16Z',
    userId: '1',
    sectionId: 1,
    projectId: 1,
  },
  {
    id: 3,
    title: 'Rhea americana',
    description: null,
    priority: 0,
    isCompleted: true,
    isAllDay: true,
    dueDate: '2022-01-02T06:45:03Z',
    userId: '1',
    sectionId: null,
    projectId: 1,
  },
  {
    id: 4,
    title: 'Struthio camelus',
    description: 'Curabitur in libero ut massa volutpat convallis.',
    priority: 10,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2023-02-10T14:36:48Z',
    userId: '1',
    sectionId: 2,
    projectId: 1,
  },
  {
    id: 5,
    title: 'Castor canadensis',
    description: null,
    priority: 1000,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2022-12-07T04:14:54Z',
    userId: '1',
    sectionId: 2,
    projectId: 1,
  },
  {
    id: 6,
    title: 'Pavo cristatus',
    description: null,
    priority: 100,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2022-01-29T21:14:34Z',
    userId: '1',
    sectionId: 2,
    projectId: 1,
  },
  {
    id: 7,
    title: 'Stenella coeruleoalba',
    description: null,
    priority: 100,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-07-14T06:01:06Z',
    userId: '1',
    sectionId: 2,
    projectId: 1,
  },
  {
    id: 8,
    title: 'Cervus unicolor',
    description: 'Vestibulum rutrum rutrum neque.',
    priority: 0,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2023-06-30T02:21:54Z',
    userId: '1',
    sectionId: 1,
    projectId: 1,
  },
  {
    id: 9,
    title: 'Spilogale gracilis',
    description: null,
    priority: 10,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-02-05T02:37:18Z',
    userId: '1',
    sectionId: 3,
    projectId: 1,
  },
  {
    id: 10,
    title: 'Coluber constrictor',
    description: null,
    priority: 0,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2023-10-09T12:31:58Z',
    userId: '1',
    sectionId: 1,
    projectId: 1,
  },
  {
    id: 1,
    title: 'Myiarchus tuberculifer',
    description: 'Duis at velit eu est congue elementum.',
    priority: 10,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-07-01T05:20:01Z',
    userId: '1',
    sectionId: 4,
    projectId: 2,
  },
  {
    id: 2,
    title: 'Paraxerus cepapi',
    description: 'Suspendisse ornare consequat lectus.',
    priority: 0,
    isCompleted: false,
    isAllDay: true,
    dueDate: '2022-12-14T04:49:28Z',
    userId: '1',
    sectionId: 5,
    projectId: 2,
  },
  {
    id: 3,
    title: 'Ciconia ciconia',
    description: 'Phasellus sit amet erat.',
    priority: 10,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-11-13T19:15:20Z',
    userId: '1',
    sectionId: 4,
    projectId: 2,
  },
  {
    id: 4,
    title: 'Pterocles gutturalis',
    description:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.',
    priority: 1000,
    isCompleted: true,
    isAllDay: true,
    dueDate: '2023-08-10T02:30:32Z',
    userId: '1',
    sectionId: 3,
    projectId: 2,
  },
  {
    id: 5,
    title: 'Raphicerus campestris',
    description: 'Morbi non quam nec dui luctus rutrum.',
    priority: 100,
    isCompleted: true,
    isAllDay: true,
    dueDate: '2023-09-10T03:52:57Z',
    userId: '1',
    sectionId: 6,
    projectId: 2,
  },
  {
    id: 6,
    title: 'Coluber constrictor',
    description: 'Maecenas pulvinar lobortis est.',
    priority: 100,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-08-12T15:09:05Z',
    userId: '1',
    sectionId: null,
    projectId: 2,
  },
  {
    id: 7,
    title: 'Dasyurus maculatus',
    description: null,
    priority: 10,
    isCompleted: true,
    isAllDay: true,
    dueDate: '2023-09-12T19:58:36Z',
    userId: '1',
    sectionId: 4,
    projectId: 2,
  },
  {
    id: 8,
    title: 'Ctenophorus ornatus',
    description: null,
    priority: 100,
    isCompleted: false,
    isAllDay: true,
    dueDate: '2022-10-26T08:21:03Z',
    userId: '1',
    sectionId: 3,
    projectId: 2,
  },
  {
    id: 9,
    title: 'Acridotheres tristis',
    description: 'Aenean fermentum.',
    priority: 0,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2023-04-05T12:19:17Z',
    userId: '1',
    sectionId: 3,
    projectId: 2,
  },
  {
    id: 10,
    title: 'Papio cynocephalus',
    description: null,
    priority: 100,
    isCompleted: false,
    isAllDay: true,
    dueDate: null,
    userId: '1',
    sectionId: null,
    projectId: 2,
  },
  {
    id: 1,
    title: 'Acridotheres tristis',
    description:
      'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    priority: 10,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2023-08-24T14:26:47Z',
    userId: '1',
    sectionId: 8,
    projectId: 3,
  },
  {
    id: 2,
    title: 'Turtur chalcospilos',
    description: 'Proin at turpis a pede posuere nonummy.',
    priority: 0,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2022-03-08T13:28:46Z',
    userId: '1',
    sectionId: 8,
    projectId: 3,
  },
  {
    id: 3,
    title: 'Phalacrocorax niger',
    description: 'Maecenas rhoncus aliquam lacus.',
    priority: 0,
    isCompleted: true,
    isAllDay: true,
    dueDate: '2023-02-26T01:52:23Z',
    userId: '1',
    sectionId: 8,
    projectId: 3,
  },
  {
    id: 4,
    title: 'Anitibyx armatus',
    description: null,
    priority: 0,
    isCompleted: false,
    isAllDay: true,
    dueDate: '2023-08-14T22:51:42Z',
    userId: '1',
    sectionId: 9,
    projectId: 3,
  },
  {
    id: 5,
    title: 'Felis caracal',
    description: null,
    priority: 10,
    isCompleted: false,
    isAllDay: true,
    dueDate: '2023-04-05T23:06:37Z',
    userId: '1',
    sectionId: 9,
    projectId: 3,
  },
  {
    id: 6,
    title: 'Pavo cristatus',
    description: 'Duis aliquam convallis nunc.',
    priority: 10,
    isCompleted: false,
    isAllDay: true,
    dueDate: null,
    userId: '1',
    sectionId: 7,
    projectId: 3,
  },
  {
    id: 7,
    title: 'Libellula quadrimaculata',
    description: null,
    priority: 1000,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2022-11-05T11:39:42Z',
    userId: '1',
    sectionId: 7,
    projectId: 3,
  },
  {
    id: 8,
    title: 'Balearica pavonina',
    description: 'Proin risus.',
    priority: 100,
    isCompleted: true,
    isAllDay: false,
    dueDate: '2022-08-15T06:09:44Z',
    userId: '1',
    sectionId: 8,
    projectId: 3,
  },
  {
    id: 9,
    title: 'Canis mesomelas',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.',
    priority: 10,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-05-06T15:09:34Z',
    userId: '1',
    sectionId: 9,
    projectId: 3,
  },
  {
    id: 10,
    title: 'Anthropoides paradisea',
    description: 'Vestibulum rutrum rutrum neque.',
    priority: 1000,
    isCompleted: false,
    isAllDay: false,
    dueDate: '2023-11-07T03:46:54Z',
    userId: '1',
    sectionId: 8,
    projectId: 3,
  },
];
export const mockPaginatedTasksList: PaginatedList<Task> = {
  pageIndex: 0,
  pageSize: 30,
  count: mockTasks.length,
  data: mockTasks,
};
