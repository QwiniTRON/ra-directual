import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Title } from 'react-admin';
import { Link } from "react-router-dom";

export default () => (
  <Card>
    <Title title="Не нашлось" />
    <CardContent>
      <h1>Ничего не нашлось</h1>

      <Typography>
        <Link to="/vaccine">к вакцинам</Link>
      </Typography>
      <Typography>
        <Link to="/diseas">к болезням</Link>
      </Typography>
    </CardContent>
  </Card>
);