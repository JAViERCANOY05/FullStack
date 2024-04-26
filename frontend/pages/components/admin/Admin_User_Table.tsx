import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import GetUsers from "../../api/getUser";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


interface Column {
  id: 'name' | 'email' | 'role' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 },

 
 
];

interface Data {
  name: string,
  email: string
  role: string,


}

function createData(
  name: string,
  email: string,
  role: string,

): Data {
  return { name, email , role  };
}



export default function StickyHeadTable() {
  const [user, setUser] = React.useState([{
    name : "",
    email : "",
    role : ""
  }]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const getData = async () => {
    try {
      const response = await GetUsers.getUser();
      if (response) {
        setUser(response)
        console.log( response ,"data is here ! ++++++++++++++++++++++");
      } else {
        console.log("error ");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);


  return (
    <div>
        <div>
      <div className=' flex  my-10 justify-between'>
      <div className=' border-b-2 border-gray-500  font-bold'>
        User Table
        </div>
        <div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  
  <span className=' text-white'>Add user <PersonAddIcon /></span>
</button>
      </div>

      </div>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}> 

  
      <TableContainer sx={{ maxHeight: 440 }}>
     
        <Table stickyHeader aria-label="sticky table">
        
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth , fontWeight: 'bold'  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
      {user.map((user, index) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>

        </TableRow>
      ))}
    </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>

  );
}
