import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RemotePagination from "./RemotePagination";
import './MasternodeTable.scss';

const API_URI = process.env.REACT_APP_SYS_API_URI;
/**
 * Component that renders the masternodes table
 * @component
 * @subcategory masternodes
 * @param {*} props sizePerPage
 * @example
 * return (
 *  <MasternodeTable  />
 * )
 */
class MasternodeTable extends Component {
  /**
   * Constructor to initialize the state of the component
   * @constructor
   * @param {*} props props received
   */
  constructor(props) {
    super(props);
    this.state = {
      dataload: 0,
      page: 1,
      tableData: [],
      sizePerPage: this.props.sizePerPage || 10,
      totalRecords: 0,
      isMobile: window.innerWidth <= 768,
    };
    this.searchInTable = this.searchInTable.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.changeFieldOrder = this.changeFieldOrder.bind(this);
  }

  /**
   * Didmount to loadData
   * @function
   */
  componentDidMount() {
    this._isMounted = true;
    this.loadData();
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  }
  /**
   * Unmount to cancel all requests
   * @function
   */
  componentWillUnmount() {
    this._isMounted = false;
    this.source.cancel("Request has been canceled");
    window.removeEventListener('resize', this.handleResize);
  }
  /**
   * Function that takes the value of the searh input and refetch LoadData
   * @param {*} e search input
   */
  searchInTable(e) {
    this.loadData(e.target.value);
  }

  /**
   * Function that resets the value of the input and refetch loadData
   */
  resetSearch() {
    document.getElementById("srcVal").value = "";
    this.loadData();
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.setState({
      dataload: 0,
    });
    var src = document.getElementById("srcVal").value;
    this.loadData(src, page, sizePerPage);
  };

  changeFieldOrder(field, order) {}

  onSizeChange(e) {
    var size = e.target.value;
    var pagenum = this.state.page;
    var src = document.getElementById("srcVal").value;
    this.loadData(src, pagenum, size);
  }

  /**
   * Function that fetch the masternodes data from the API
   * @function
   * @param {*} srcData
   * @param {*} page
   * @param {*} sizePerPage
   */
  async loadData(srcData, page, sizePerPage) {
    var postData = {
      page: this.state.page,
      search: "",
      sortBy: "lastPayment",
      sortDesc: true,
      perPage: this.state.sizePerPage,
    };
    if (srcData !== undefined && parseInt(page) >= 1) {
      postData.page = page;
      this.setState({
        page: page,
      });
    }
    if (sizePerPage !== undefined && parseInt(sizePerPage) >= 1) {
      postData.perPage = sizePerPage;
      this.setState({
        sizePerPage: sizePerPage,
      });
    }
    if (srcData !== undefined && srcData !== "") {
      postData.search = srcData;
    }
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    let axiosConfig = {
      params: postData,
      headers: {
        // "Content-Type": "application/json;charset=UTF-8",
        // Accept: "application/json, text/plain, */*",
        // "Access-Control-Allow-Origin": "*",
        appclient: process.env.REACT_APP_CLIENT,
      },
      cancelToken: this.source.token,
    };

    await axios
      .get(`${API_URI}/statsInfo/masternodes`, axiosConfig)
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            dataload: 1,
            tableData: res.data.returnArr,
            totalRecords: res.data.mnNumb,
          });
        }
      })
      .catch((err) => {
        if (this._isMounted) {
          this.setState({
            dataload: 2,
          });
        }
      });
  }

  render() {
    const { dataload, page, tableData, sizePerPage, totalRecords } = this.state;
    const { t, path } = this.props;

    if (dataload === 1) {
      return (
        <>
          {/* Search Input */}
          <div className="sentry-search-container">
            <input
              id="srcVal"
              type="text"
              className="sentry-search-input"
              placeholder={t("check.table.ipInput")}
              onKeyUp={this.searchInTable}
            />

            {/* Buttons - different layouts for mobile vs desktop */}
            <div className={`sentry-buttons-container ${this.state.isMobile ? 'mobile' : 'desktop'}`}>
              {this.state.isMobile ? (
                <>
                  {/* Mobile: Registration first, then Reset */}
                  <Link
                    to={path !== undefined ? `${path}/masternode-registration` : `masternodes/masternode-registration`}
                    className="sentry-btn sentry-btn--register"
                  >
                    <span className="sentry-btn__text">{t("check.register.link")}</span>
                  </Link>

                  <button
                    type="button"
                    className="sentry-btn sentry-btn--reset"
                    onClick={this.resetSearch}
                  >
                    <span className="sentry-btn__text">{t("check.table.resetBtn")}</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Desktop: Reset first, then Registration */}
                  <button
                    type="button"
                    className="sentry-btn sentry-btn--reset"
                    onClick={this.resetSearch}
                  >
                    <span className="sentry-btn__text">{t("check.table.resetBtn")}</span>
                  </button>

                  <Link
                    to={path !== undefined ? `${path}/masternode-registration` : `masternodes/masternode-registration`}
                    className="sentry-btn sentry-btn--register"
                  >
                    <span className="sentry-btn__text">{t("check.register.link")}</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          <RemotePagination
            data={tableData}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={totalRecords}
            onTableChange={this.handleTableChange}
            onSizeChange={this.onSizeChange}
            changeFieldOrder={this.changeFieldOrder}
            t={t}
            simple={this.props.simple}
            isMobile={this.state.isMobile}
          />
        </>
      );
    } else if (dataload === 0) {
      return <p className="text-center">{t("check.loading")}</p>;
    } else {
      return <p className="text-center">{t("check.noData")}</p>;
    }
  }
}

export default withTranslation()(MasternodeTable);
