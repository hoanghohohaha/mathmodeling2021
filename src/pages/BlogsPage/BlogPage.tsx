import React, { useState } from "react";
import { useEffect } from "react";
import withLayout from "../../layout/withLayout";
import { apiUrl } from "../../config/apiUrl.json";
import axios from "axios";
import { Grid } from "@material-ui/core";
import BlogPreview from "../../components/BlogPreview";

interface IBlog {
  [key: string]: any;
}

function BlogsPage() {
  const [blogList, setBlogList] = useState<IBlog[]>([]);
  useEffect(() => {
    axios.get(`${apiUrl}/api/article`).then((res) => {
      if (res.data) {
        setBlogList(res.data.filter((el: any) => el.isPublished === true));
      }
    });
  }, []);

  return (
    <div>
      <Grid style={{ marginBottom: 60 }}>
        {blogList?.map((item) => (
          <BlogPreview
            key={item?.id}
            id={item?.id}
            body={item?.body.slice(0, 600)}
            title={item?.title}
            image={(item && item.image != null && item.image) || null}
          />
        ))}
      </Grid>
    </div>
  );
}

export default withLayout(BlogsPage);
