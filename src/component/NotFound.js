import { useNavigate } from "react-router-dom";
import React from "react";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
      <section className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
       <div>
          <h1>Not Found</h1>

          <br />
          <p>Page is not available.</p>
          <div className="flex-row">
              <button className="btn btn-primary" onClick={goBack}>Go Back</button>
          </div>
          </div>
      </section>
  )
}

export default NotFound;