import { Link } from "react-router-dom";
const columnData = [
  {
    Header: "Id",
    accessor: "id", // accessor is the "key" in the data
    Cell: ({ value }) => (
      <Link to={`/details/${value}`} key={value}>
        {value}{" "}
      </Link>
    ),
  },
  {
    Header: "Name",
    accessor: "name",

    Cell: ({ value, row }) => {
      return (
        <Link to={`/details/${row?.original?.id}`} key={value}>
          {value}
     
        </Link>
      );
    },
  },
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: ({ value,row }) => (
      <Link to={`/details/${row?.original?.id}`} key={value}>
        {value}{" "}
      </Link>
    ),
  },
  {
    Header: "Current Price",
    accessor: "current_price",
    Cell: ({ value ,row}) => (
      <Link to={`/details/${row?.original?.id}`} key={value}>
        {value}{" "}
      </Link>
    ),
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ value,row }) => (
      <Link to={`/details/${row?.original?.id}`} key={value}>
        <img src={value} style={{width:"50px"}}></img>
      </Link>
    ),
  },
];

export { columnData };
