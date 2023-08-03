import React, { useState } from "react";
import CardInterface from "../../models/Interfaces/CardInterface";
import CardHeader from "@mui/material/CardHeader";
import { Box, Button, Divider } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardBodyRow from "./CardBodyRow";
import { Link } from "react-router-dom";
import { useUser } from "../../../users/providers/UserProvider";
import CardBizNumberDialog from "./CardBizNumberDialog";
import useCards from "../../hooks/useCards";
import mapCardToModel from "../../helpers/normalizations/mapCardToModel";

type CardBodyProps = { card: CardInterface };

const CardDetailsBody: React.FC<CardBodyProps> = ({ card }) => {
  const {
    title,
    subtitle,
    description,
    email,
    address,
    phone,
    bizNumber,
    web,
    createdAt,
  } = card;
  const { city, houseNumber, street, country, zip } = address;
  const { user } = useUser();
  const [isDialogOpen, setDialog] = useState(false);
  const { handleUpdateCardBizNumber } = useCards();
  // const [bizNumberFromDatabase, setBizNumberFromDatabase] = useState("");

  const handleDialog = (term?: string) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const onUpdateCard = async (newBizNumber: string) => {
    card.bizNumber = Number(newBizNumber);
    const modeledCard = mapCardToModel(card!);
    await handleUpdateCardBizNumber(modeledCard);
  };

  const handleUpdate = (newBizNumber: any) => {
    handleDialog();
    onUpdateCard(newBizNumber);
  };

  return (
    <CardContent sx={{ pb: 1 }}>
      <CardHeader title={title} subheader={subtitle} sx={{ p: 0, mb: 1 }} />

      <Divider />
      <Box mt={1}>
        <CardBodyRow
          title="Phone"
          content={<Link to={`tel:${phone}`}>{phone}</Link>}
        />
        <CardBodyRow
          title="Address"
          content={`${street} ${houseNumber} ${city} ${zip}${country}`}
        />
        <CardBodyRow
          title="Email"
          content={<Link to={`mailto:${email}`}>{email}</Link>}
        />
        <CardBodyRow
          title="Web"
          content={
            <Link to={`${web}`} target="_blank">
              {web}
            </Link>
          }
        />
        <CardBodyRow title="Description" content={description} />
        <CardBodyRow title="Created at" content={String(createdAt)} />
        {/* <CardBodyRow title="Card Number" content={String(bizNumber)} /> */}
        {user!.isAdmin && (
          <CardBodyRow
            title="Card Number"
            content={
              <>
                {String(bizNumber)}{" "}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => handleDialog("open")}
                >
                  Edit
                </Button>
              </>
            }
          />
        )}
        <CardBizNumberDialog
          dialogTitle={"Please enter the new bizNumber"}
          isDialogOpen={isDialogOpen}
          onChangeDialog={handleDialog}
          // onUpdate={() => handleUpdate(card._id)}
          onUpdate={handleUpdate}
          dialogNewBizNumber={""}
          bizNumberFromDatabase={bizNumber}
        />
      </Box>
    </CardContent>
  );
};

export default CardDetailsBody;
