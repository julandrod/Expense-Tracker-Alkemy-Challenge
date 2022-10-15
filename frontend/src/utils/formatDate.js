import moment from "moment";
import "moment/locale/es";

moment.locale("es");

export const formatDate = (date) => {
  return moment(date).format("MMMM D, YYYY");
};
