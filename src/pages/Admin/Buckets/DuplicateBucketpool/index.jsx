/*
 Copyright (C) 2022 Samuel Dushimimana (dushsam100@gmail.com)
 
 SPDX-License-Identifier: GPL-2.0

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import React, { useState, useEffect } from "react";

// constants
import { initialBucketpoolList } from "constants/constants";

// Widgets
import { Button, InputContainer, Spinner } from "components/Widgets";

// Tittle
import Title from "components/Title";

const DuplicateBucketPool = () => {
  // State Variable for handling the submit button loading
  const [loading, setLoading] = useState(false);

  // Setting the list for all the bucket pool names
  const [bucketList, setBucketList] = useState(initialBucketpoolList);

  // Data required for creating the bucketpool
  const [values, setValues] = useState({
    bucket: "",
    updateDefault: false,
  });

  useEffect(() => {
    setBucketList(initialBucketpoolList);
  }, []);

  const handleChange = (e) => {
    const { name } = e.target;

    if (Object.keys(values).find((field) => field === name)) {
      setValues({ ...values, [e.target.name]: e.target.checked });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {" "}
      <Title title="Duplicate Bucketpool" />
      <div className="container">
        <div className="row py-5">
          <div className="col-12 ">
            <span>
              The purpose of this is to facilitate editing an existing
              bucketpool. Make sure you understand Creating Bucket Pools before
              continuing. It will explain why you should create a new bucketpool
              rather than edit an old one that has already recorded results.
            </span>
            <a
              className="mx-2"
              href="https://github.com/fossology/fossology/wiki/Buckets"
            >
              Creating Bucket Pools
            </a>
            <span className="mx-2">
              before continuing. It will explain why you should create a new
              bucketpool rather than edit an old one that has already recorded
              results.
            </span>
          </div>
          <div className="col-12 py-3">
            <h3>Steps to modify a bucketpool:</h3>
          </div>
          <div className="col-12 py-3">
            <ol>
              <li>
                Create a baseline with your current bucketpool. In other words,
                run a bucket scan on something. If you do this before creating a
                new modified bucketpool, you can compare the old results with
                the new to verify it is working as you expect.
              </li>
              <li>
                Duplicate the bucketpool (this will increment the bucketpool
                version and its bucketdef records). You should also check
                'Update my default bucketpool' since new bucket jobs only use
                your default bucketpool.
              </li>
              <li>
                Duplicate any bucket scripts that you defined in
                /var/local/lib/fossology.
              </li>
              <li>Manually edit the new bucketpool record, if desired.</li>
              <li>Manually insert/update/delete the new bucketdef records.</li>
              <li>Manually insert a new buckets record in the agent table.</li>
              <li>{`Queue up the new bucket job in Jobs > Schedule Agents.`}</li>
              <li>{`Use Buckets > Compare to compare the new and old runs. Verify the results.`}</li>
              <li>
                {`If you still need to edit the buckets, use Buckets > Remove Bucket
              Results to remove the previous runs results and repeat starting
              with editing the bucketpool or def records.`}
              </li>
              <li>
                When the bucket results are what you want, then you can reset
                all the users of the old bucketpool to the new one (manual sql
                step).
              </li>
            </ol>
          </div>
          <div className="col-12 my-2">
            <hr />
          </div>
          <div className="col-12 d-md-flex">
            <span className="mt-4 mr-3">
              Choose the bucketpool to duplicate
            </span>
            <InputContainer
              type="select"
              name="name"
              className="col-12"
              id="choose-duplicate-pool-id"
              onChange={(e) => handleChange(e)}
              options={bucketList}
              value={bucketList?.id}
              property="name"
            />
          </div>
          <div className="col-12 d-flex mt-4">
            <InputContainer
              type="checkbox"
              name="updateDefault"
              checked={values.updateDefault}
              id="update-default-bucketpool-id"
              onChange={(e) => handleChange(e)}
            />
            <span>Update my default bucketpool</span>
          </div>
          <div className="mt-4 pl-3">
            <Button onClick={handleSubmit}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DuplicateBucketPool;
