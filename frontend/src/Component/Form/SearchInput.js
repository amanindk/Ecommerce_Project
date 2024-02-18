import React from "react";
import { useSearch } from "../../Context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SearchInput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handlesubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          aria-label="Search"
        />
        <button className="btn btn-outline-danger" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
