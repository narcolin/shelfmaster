import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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
  const { setRows, setRowModesModel, inventory } = props;

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
    </GridToolbarContainer>
  );
}

export default function Table(props) {
  // const [rows, setRows] = React.useState(initialRows);
  const inventory = props.user.inventory;
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

  const filteredRows = Object.keys(filters).some((filter) => filters[filter])
    ? rows.filter((row) => filters[row.food_type])
    : rows;

  const [rowModesModel, setRowModesModel] = React.useState({});

  const [sortModel, setSortModel] = React.useState([
    { field: "name", sort: "asc" },
  ]);

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
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    try {
      await updateItem(updatedRow.id, updatedRow);
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
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "DatePurchased",
      headerName: "Date Purchased",
      type: "date",
      width: 180,
      editable: true,
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
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
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
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, inventory },
        }}
      />
    </Box>
  );
}
