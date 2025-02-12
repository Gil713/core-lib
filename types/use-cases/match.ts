export type IDayItem = {
  title: string; // "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7" , "Hôm nay", "Ngày mai"
  shortDay: string; // DD/MM
  longDay: string; // YYYY-MM-DD
};

export type ILeague = {
  id: string;
  name: string;
  logo: string;
};
