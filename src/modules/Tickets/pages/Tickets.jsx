import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TitleFunction } from "../../../utils/TitleFunction";
import { getTickets } from "../../../apis/TicketAPI";
import useRequest from "../../../hooks/useRequest";
import TicketInfo from "../components/TicketInfo/TicketInfo";
import TicketSeat from "../components/TicketSeat/TicketSeat";
import "./Ticket.scss";
export default function Ticket() {
  const [checkList, setCheckList] = useState([]);

  const handleChecked = (seat) => {
    const index = checkList.findIndex((seatList) => {
      return seatList.maGhe === seat.maGhe;
    });

    let newList = [...checkList];
    if (index !== -1) {
      newList = newList.filter((item) => {
        return item.maGhe !== seat.maGhe;
      });
    } else {
      newList.push(seat);
    }

    setCheckList(newList);
  };

  const { ticketId } = useParams();

  const { data: tickets, isLoading, error } = useRequest(() => getTickets(ticketId));

  TitleFunction("Ticket");

  return (
    <div style={{ margin: "64px 0 0" }} className="ticket">
      <div className="ticket-main">
        <div className="ticket-seat-list">
          <TicketSeat tickets={tickets} checkList={checkList} handleChecked={handleChecked} />
        </div>

        <div className="ticket-booking">
          <TicketInfo ticketId={ticketId} tickets={tickets} checkList={checkList} />
        </div>
      </div>
    </div>
  );
}
