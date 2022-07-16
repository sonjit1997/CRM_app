import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import "../style/engineer.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import MaterialTable from "@material-table/core";
import { Modal, Button } from "react-bootstrap";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchTicket, updateSelectTicket,ticketCreation } from "../Api/ticket";
function Customer() {
  const [userModal, setUserModal] = useState(false);

  const [ticktDetail, SettickestDetail] = useState([]);
  const [ticketCreationModal, setTicketCreationModal] = useState(false);
  const [selecttedTicket, setselecttedTicket] = useState({});
  const [countTicket, setcountTicket] = useState({});

  const [message, setMessage] = useState("");

  const closeUserModal = () => {
    setUserModal(false);
  };

  const closeTicketCreationModal = () => setTicketCreationModal(false)

  useEffect(() => {
    (async () => {
      fetchTickets();
    })();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          SettickestDetail(response.data);
          ticketCounting(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTicket = (ticktDetail) => {
    const ticket = {
      assignee: ticktDetail.assignee,
      description: ticktDetail.description,
      id: ticktDetail.id,
      reporter: ticktDetail.reporter,
      status: ticktDetail.status,
      title: ticktDetail.title,
    };
    //console.log(ticket);
    setselecttedTicket(ticket);
    setUserModal(true);
  };

  const updateselecttedTicket = (data) => {
    setselecttedTicket(data);
  };

  const onTicketupdate = (e) => {
    if (e.target.name === "title") {
      selecttedTicket.title = e.target.value;
    }
    else if (e.target.name === "description"){
      selecttedTicket.description = e.target.value;
    }
    else if (e.target.name === "status"){
      selecttedTicket.status = e.target.value;
    }

    updateselecttedTicket(Object.assign({}, selecttedTicket));
  };

  const updateTicket = (e) => {
    e.preventDefault();
    updateSelectTicket(selecttedTicket.id, selecttedTicket)
      .then(function (response) {
       // console.log(selecttedTicket);
        console.log("update successfully");
        closeUserModal();
        fetchTickets();
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
      // POST A TICKET 
      const createTicket = (e)=>{
        e.preventDefault()
        // grab the new values 
        const data={
             title:e.target.title.value,
             description:e.target.description.value
        }
         // call the api 
        ticketCreation(data).then(function (response){
            setMessage("Ticket Created Successfully");
            closeTicketCreationModal();
            fetchTickets();

        }).catch(function (error){
            if (error.response.status === 400)
                    setMessage(error.message);
                    else if(error.response.status === 401)
                    {
                      console.log(error);

                    }
                    else
                console.log(error);
        })

      }

  const ticketCounting = (tickets) => {
    const ticketType = {
      open: 0,
      in_progress: 0,
      blocked: 0,
      closed: 0,
    };
    tickets.forEach((element) => {
      if (element.status === "OPEN") ticketType.open += 1;
      else if (element.status === "IN_PROGRESS") ticketType.in_progress += 1;
      else if (element.status === "BLOCKED") ticketType.blocked += 1;
      else ticketType.closed += 1;
    });

    setcountTicket(Object.assign({}, ticketType));
  };

  //console.log(countTicket);

  return (
    <div className="bg-light min-vh-100">
      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container col m-2  ">
          <h1 className="text-center" id="main">WELCOME  {localStorage.getItem("userTypes")}</h1>
          <h6 className=" text-muted text-center">
            Take a quick look at your stats below{" "}
          </h6>
          <div className="row my-5 mx-2 text-center ">
            <div className="col my-1">
              <div
                className="rounded-pill bg-warning bg-opacity-25"
                id="border-a"
                style={{ width: 12 + "rem" }}
              >
                <div className="cardbody p-1 ">
                  <h5 className="card-subtitle my-1">
                    <i className="bi bi-pencil-square mx-2" id="pen-a"></i>
                    OPEN
                  </h5>
                  <br />
                  <div className="row pb-1 ">
                    <div className="col">{countTicket.open}</div>
                    <div className="col">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar
                          value={countTicket.open}
                          styles={buildStyles({
                            textColor: "rgb(180, 180, 23)",
                            pathColor: "rgb(207, 207, 28)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col my-1">
              <div
                className="rounded-pill bg-success bg-opacity-25 "
                id="border-b"
                style={{ width: 12 + "rem" }}
              >
                <div className="cardbody p-1 ">
                  <h5 className="card-subtitle my-1">
                    <i className="bi bi-hourglass-split mx-2" id="pen-b"></i>
                    PROGRESS
                  </h5>
                  <br />
                  <div className="row pb-1 ">
                    <div className="col">{countTicket.in_progress}</div>
                    <div className="col">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar
                          value={countTicket.in_progress}
                          styles={buildStyles({
                            textColor: "rgb(21, 220, 124)",
                            pathColor: "rgb(21, 220, 124)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col my-1">
              <div
                className="rounded-pill bg-danger bg-opacity-25"
                id="border-c"
                style={{ width: 12 + "rem" }}
              >
                <div className="cardbody p-1 ">
                  <h5 className="card-subtitle my-1">
                    <i className="bi bi-clipboard-x mx-2" id="pen-c"></i>
                    BLOCKED
                  </h5>
                  <br />
                  <div className="row pb-1 ">
                    <div className="col">{countTicket.blocked}</div>
                    <div className="col">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar
                          value={countTicket.blocked}
                          styles={buildStyles({
                            textColor: " rgb(225, 84, 56)",
                            pathColor: " rgb(225, 84, 56)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col my-1">
              <div
                className="rounded-pill bg-info bg-opacity-25"
                id="border-d"
                style={{ width: 12 + "rem" }}
              >
                <div className="cardbody p-1 ">
                  <h5 className="card-subtitle my-1">
                    <i className="bi  bi-shield-check mx-2" id="pen-d"></i>
                    CLOSED
                  </h5>
                  <br />
                  <div className="row pb-1">
                    <div className="col">{countTicket.closed}</div>
                    <div className="col">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar
                          value={countTicket.closed}
                          styles={buildStyles({
                            textColor: "rgb(19, 170, 175)",
                            pathColor: "rgb(19, 170, 175)",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />

          <MaterialTable
            onRowClick={(e, ticktDetail) => editTicket(ticktDetail)}
            data={ticktDetail}
            columns={[
              {
                title: "USER ID",
                field: "id",
              },
              { title: "TITLE", field: "title" },
              { title: "DESCRIPTION", field: "description" },
              {
                title: "CREATED TIME",
                field: "createdAt",
              },
             
              {
                title: "STATUS",
                field: "status",
                lookup: {
                  OPEN: "OPEN",
                  CLOSED: "CLOSED",
                  IN_PROGRESS: "IN_PROGRESS",
                  BLOCKED: "BLOCKED",
                },
              },
            ]}
            options={{
              exportMenu: [
                {
                  label: "Export Pdf",
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "Ticket Records"),
                },
                {
                  label: "Export Csv",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "Ticket Records"),
                },
                
              ],
              headerStyle: {
                backgroundColor: "#0F3443",
                color: "#fff",
              },
              rowStyle: {
                backgroundColor: "#eee",
              },
            }}
            title="TICKETS RAISED BY YOU"
          />
          <input type="submit" className=" btn btn-success text-white fw-bolder my-2 float-end" value="RAISED NEW" onClick={()=>setTicketCreationModal(true)} />
        
           
             {
                    ticketCreationModal ? (
                        <Modal
                          show={ticketCreationModal}
                          onHide={closeTicketCreationModal}
                          backdrop="static"
                          keyboard={false}
                          centered
                      >
                          <Modal.Header closeButton>
                              <Modal.Title >RAISE TICKET</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={createTicket} >
                                <div className="p-1">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="title" placeholder="Title" required/>
                                    </div>
                                    <div >
                                        <textarea id="form16" className="md-textarea form-control" rows="3" name="description" placeholder="Description" required></textarea>
                                    </div>
                                </div>
                                <div className="input-group justify-content-center">
                                    <div className="m-1">
                                        <Button variant="secondary"  onClick={() => closeTicketCreationModal()} >Cancel</Button>
                                    </div>
                                    <div className="m-1">
                                        <Button type="submit" variant="success" >Create</Button>
                                    </div>
                                </div>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                          </Modal.Footer>


                      </Modal>
                    ):(
                        ""
                    )

                }

          {userModal ? (
            <Modal
              show={userModal}
              onHide={closeUserModal}
              backdrop="static"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form onSubmit={updateTicket}>
                  <div className="p-1">
                    <h5 className="text-danger">
                      User ID :{selecttedTicket.id}
                    </h5>
                    <div className="input-group">
                      <label className="label input-group-text text-success label-md ">
                        TITLE
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={selecttedTicket.title}
                        onChange={onTicketupdate}
                      />
                    </div>
                    <div className="input-group mt-2">
                      <label className="label input-group-text text-success  label-md  ">
                        DESCRIPTION
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={selecttedTicket.description}
                        onChange={onTicketupdate}
                      />
                    </div>
                   
                    
                    <Button
                      type="submit"
                      className="btn btn-success my-1 float-end"
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : ("")}
        </div>
      </div>
    </div>
  );
}

export default Customer;
