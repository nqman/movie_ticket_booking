import React, { Fragment } from "react";
import cn from "classnames";
import "./ticketStyles.scss";

export default function TicketSeat({ tickets, checkList, handleChecked }) {
  return (
    <div className="ticketSeat">
      <div className="ticket-light"></div>

      <div className="ticket-seats">
        <div className="ticket-list">
          {tickets?.danhSachGhe.map((seat, index) => {
            const isChecked = checkList.findIndex((item) => item.maGhe === seat.maGhe) !== -1;
            return (
              <Fragment key={index}>
                {!seat.daDat ? (
                  <button
                    onClick={() => handleChecked(seat)}
                    className={cn(
                      "ticket-seat",
                      {
                        "ticket-vip": seat.loaiGhe === "Vip",
                      },
                      {
                        "ticket-checked": isChecked,
                      }
                    )}
                  >
                    {Number(seat.tenGhe).toLocaleString()}
                  </button>
                ) : (
                  <button className="ticket-booked" disabled={seat.daDat}>
                    X
                  </button>
                )}
                {(index + 1) % 16 === 0 ? <br /> : ""}
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="ticket-sub">
        <div>
          <span className="checked"></span>
          <span className="title">Đang Chọn</span>
        </div>

        <div>
          <span className="vip"></span>
          <span className="title">Vip</span>
        </div>

        <div>
          <span className="regular"></span>
          <span className="title">Thường</span>
        </div>

        <div>
          <span className="booked">X</span>
          <span className="title">Đã đặt</span>
        </div>
      </div>
    </div>
  );
}
