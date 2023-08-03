import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import UserInterface from "../users/models/interfaces/UserInterface";
import useHandleUsers from "../users/hooks/useHandleUsers";
import { makeFirstLetterCapital } from "../layout/header/TopNavBar/menu/utils/algoMethods";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ROUTES from "../routes/routesModel";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../users/providers/UserProvider";
import DeleteDialog from "../cards/components/card/DeleteDialog";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const CRMPage = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const { handleGetUsers, handelDeleteUser } = useHandleUsers();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const navigate = useNavigate();

  // Define type for dialog state
  type DialogState = boolean[];

  // Create an array to hold dialog states and functions for each user
  const [isDialogOpenList, setDialogOpenList] = useState<DialogState>([]);

  useEffect(() => {
    // Initialize the dialog state array based on the number of users
    setDialogOpenList(new Array(users.length).fill(false));
  }, [users]);

  // Function to handle opening the dialog for a specific user
  const handleOpenDialog = (index: number) => {
    const updatedDialogOpenList = [...isDialogOpenList];
    updatedDialogOpenList[index] = true;
    setDialogOpenList(updatedDialogOpenList);
  };

  // Function to handle closing the dialog for a specific user
  const handleCloseDialog = (index: number) => {
    const updatedDialogOpenList = [...isDialogOpenList];
    updatedDialogOpenList[index] = false;
    setDialogOpenList(updatedDialogOpenList);
  };

  const onDeleteUser = async (userId: string) => {
    console.log(userId);
    if (user) console.log(user._id);
    await handelDeleteUser(userId);
    const updatedUsers = await handleGetUsers();
    setUsers(updatedUsers || []);
  };

  const handleDelete = (index: number, userId: string) => {
    handleCloseDialog(index);
    onDeleteUser(userId);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers:
          | UserInterface[]
          | undefined = await handleGetUsers();
        setUsers(fetchedUsers!);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container>
      <PageHeader
        title="CRM Page"
        subtitle="On this page you can find all the customers data"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Is Business</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: UserInterface, index) => (
              <TableRow key={user._id}>
                <TableCell>{makeFirstLetterCapital(user.name.last)}</TableCell>
                <TableCell>{makeFirstLetterCapital(user.name.first)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {makeFirstLetterCapital(
                    user.address.street +
                      " " +
                      user.address.houseNumber +
                      "," +
                      " "
                  )}{" "}
                  {makeFirstLetterCapital(user.address.city)}
                </TableCell>
                <TableCell>
                  {user.isBusiness ? (
                    <CloseIcon color="success" />
                  ) : (
                    <DoneIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      navigate(
                        `${ROUTES.CRM}/${user._id}${ROUTES.EDIT_USER}/${user._id}`
                      )
                    }
                    aria-label="edit user"
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(index)}
                    aria-label="delete user"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
                <DeleteDialog
                  dialogTitle={"Are you sure you want to delete this user?"}
                  isDialogOpen={isDialogOpenList[index]}
                  onChangeDialog={() => handleCloseDialog(index)}
                  onDelete={() => handleDelete(index, user._id)}
                  dialogText={
                    "This operation will completely delete the user  and all its data from the database and it will not be possible to retrieve the user afterwards"
                  }
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CRMPage;
