import React, { use, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { usePopup } from "../../context/popUpContext";


const Dasboard = () => {
  const token = localStorage.getItem("myToken");
  const { showPopup } = usePopup();

  const [employee, setEmployee] = useState([]);
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateId,setUpdateID]= useState(null)
  const [isupdate,setIsUpdate] = useState(false)

  const getEmployees = async () => {
    setLoading(true);
    try {
      const url = `${servers.activities}/employee?page=${
        page + 1
      }&perPage=${pageSize}`;
      const result = await fetchData(url, token);
      if (result.error) {
        showPopup(result.error);
      } else {
        setEmployee(result.data.employees);
        setRowCount(result.data.pagination.totalItems);
      }
    } catch (error) {
      showPopup(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [page, pageSize]);

  const deleteRequest = async (id) => {
    setLoading(true);
    try {
      const result = await deleteData(
        `${servers.activities}/employee/delete/${id}`,
        token
      );
      if (result.error) {
        showPopup(result.error);
      } else {
        window.location.reload();
      }
    } catch (error) {
      showPopup(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUpdateForm = (id)=>{
    setIsUpdate(!isupdate)
    setUpdateID(id)
  }

  

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "laptopManufacture", headerName: "Manufacture", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "serialNumber", headerName: "Serial Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <div className="flex gap-4">
        <Button
          className="bg-red-500 cursor-pointer w-full"
          onClick={() => deleteRequest(params.row.id)}
          >
          Delete
        </Button>
        <Button
          className="bg-red-500 cursor-pointer w-full"
          onClick={() => toggleUpdateForm(params.row.id)}
        >
          Update
        </Button>
          </div>
      ),
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBarComponent />
      <div className="flex-1 p-4">
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Clients</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add New Client
            </button>
          </div>
          <div
            style={{ height: 600, width: "80vw" }}
            className="overflow-x-scroll"
          >
            <DataGrid
              rows={employee}
              columns={columns}
              pagination
              paginationMode="server"
              rowCount={rowCount}
              paginationModel={{ page, pageSize }}
              showToolbar
              onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
              }}
              loading={loading}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </div>
        </div>
        <UpdateClient
          isOpen={isupdate}
          onClose={()=>toggleUpdateForm(-1)}
          id={updateId}
        />
        <AddClientPage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dasboard;
