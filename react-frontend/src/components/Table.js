import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import // randomCreatedDate,
// randomTraderName,
// randomArrayItem,
"@mui/x-data-grid-generator";

// const roles = [
//   "Grains",
//   "Fruits",
//   "Vegetables",
//   "Proteins",
//   "Dairy",
//   "Beverages",
//   "Miscelaneous",
// ];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

// const initialRows = [
//   {
//     id: randomId(),
//     food: "",
//     Quantity: "",
//     DatePurchased: "",
//     role: "",
//   },
// ];

async function getItems(inventory_id, { setInventoryData }) {
  try {
    const response = await axios.get(
      `http://localhost:8000/items?inventoryId=${inventory_id}`,
    );
    setInventoryData(response.data.inventory);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateItem(id, item) {
  console.log(id);
  console.log(item);
  try {
    const response = await axios.patch(
      `http://localhost:8000/items/${id}`,
      item,
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

async function addItem(inventory, item) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/inventories/${inventory}`,
      { data: item },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

async function removeItem(inventory, item) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/inventories/${inventory}/remove`,
      { data: item },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
function EditToolbar(props) {
  const { setRows, setRowModesModel, inventory, alertMessage } = props;

  const handleClick = () => {
    const id = uuidv4()
      .replace(/-/g, "")
      .match(/[a-f\d]{24}/)[0];
    addItem(inventory, id);
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", quantity: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "food" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <div
        className={`alert alert-danger d-flex align-items-center ${
          alertMessage ? "visible-true" : "visible-false"
        }`}
      >
        <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" />
        <div>{alertMessage}</div>
      </div>
    </GridToolbarContainer>
  );
}

export default function Table(props) {
  // const [rows, setRows] = React.useState(initialRows);
  const inventory = props.user ? props.user.inventory : null;
  const filters = props.filters;
  const [rows, setRows] = React.useState(
    props.inventoryData.map((item) => {
      return {
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        food_type: item.food_type,
      };
    }),
  );

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [expandedRowData, setExpandedRowData] = React.useState(null);

  const { alertMessage, setAlertMessage } = props;

  const filteredRows = Object.keys(filters).some((filter) => filters[filter])
    ? rows.filter((row) => filters[row.food_type])
    : rows;

  const [rowModesModel, setRowModesModel] = React.useState({});

  const { setSelectedIngredients } = props;

  const [sortModel, setSortModel] = React.useState([
    { field: "name", sort: "asc" },
  ]);

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleExpandRow = (id) => (event) => {
    event.stopPropagation();
    const expandedRow = props.inventoryData.find((item) => item._id === id);
    setExpandedRowData(expandedRow);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSelectionModelChange = (selectionModel) => {
    const selectedIngredients = selectionModel.map((selectedId) => {
      const selectedRow = rows.find((row) => row.id === selectedId);
      return selectedRow ? selectedRow.name : "";
    });
    setSelectedIngredients(selectedIngredients);
    setSelectedRows(selectionModel);
    setAlertMessage(null);
  };
  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    removeItem(inventory, id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    setAlertMessage(null);
    console.log(newRow);
    console.log(Object.values(newRow).some((value) => value === ""));
    if (Object.values(newRow).some((value) => value === "")) {
      setAlertMessage("All columns must be set.");
      console.error("Error updating item:", "All columns must be set.");
      return;
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    try {
      await updateItem(updatedRow.id, updatedRow);
      await getItems(inventory, { setInventoryData: props.setInventoryData });
    } catch (error) {
      console.error("Error updating item:", error);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Food", width: 240, editable: true },
    {
      field: "selection",
      headerName: "",
      type: "checkbox",
      width: 50,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
    },
    {
      field: "food_type",
      headerName: "Food Group",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Grains",
        "Fruits",
        "Vegetables",
        "Proteins",
        "Dairy",
        "Beverages",
        "Miscellaneous",
      ],
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="first"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="second"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="first"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="second"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "expand",
      headerName: "Logs",
      width: 50,
      renderCell: ({ id }) => (
        <IconButton size="small" onClick={handleExpandRow(id)}>
          <AddIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        left: 65,
        top: 84,
        height: window.innerHeight - 84,
        width: window.innerWidth - 65,
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectedRows}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, inventory, alertMessage },
        }}
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose} scroll="paper">
        <DialogTitle id="expanded-row-dialog-title">Logs</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="expanded-row-dialog-description">
            {expandedRowData && (
              <table>
                <thead>
                  <tr>
                    <th>Delta Quantity</th>
                    <th>Date Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {expandedRowData.dates_modified.map((date, index) => (
                    <tr key={date}>
                      <td>{expandedRowData.delta_quantity[index]}</td>
                      <td>{new Date(date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
