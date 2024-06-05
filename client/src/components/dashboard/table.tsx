import * as React from 'react';
 import Box from '@mui/material/Box';
 import Collapse from '@mui/material/Collapse';
 import IconButton from '@mui/material/IconButton';
 import Table from '@mui/material/Table';
 import TableBody from '@mui/material/TableBody';
 import TableCell from '@mui/material/TableCell';
 import TableContainer from '@mui/material/TableContainer';
 import TableHead from '@mui/material/TableHead';
 import TableRow from '@mui/material/TableRow';
 import Typography from '@mui/material/Typography';
 import Paper from '@mui/material/Paper';
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  nameweek: string,
  topic_1: number,
  topic_2: number,
  topic_3: number,
  feedback: String,
  price: number,
) {
  return {
    nameweek,
    topic_1,
    topic_2,
    topic_3,
    feedback,
    price,
    criterion: [
      {
        topic: 'Topic 1',
        score3: '3 คะแนน = สามารถอธิบายและนำไปประยุกต์ได้',
        score2: '2 คะแนน = รู้จัก Technology และสามารถตอบได้',
        score1: '1 คะแนน = ไม่เข้าใจไม่สามารถตอบได้',
      },
      {
        topic: 'Topic 2',
        score3: '3 คะแนน = สามารถอธิบายและนำไปประยุกต์ได้',
        score2: '2 คะแนน = รู้จัก Technology และสามารถตอบได้',
        score1: '1 คะแนน = ไม่เข้าใจไม่สามารถตอบได้',
      },
      {
        topic: 'Topic 3',
        score3: '3 คะแนน = สามารถอธิบายและนำไปประยุกต์ได้',
        score2: '2 คะแนน = รู้จัก Technology และสามารถตอบได้',
        score1: '1 คะแนน = ไม่เข้าใจไม่สามารถตอบได้',
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.nameweek}
        </TableCell>
        <TableCell align="right">{row.topic_1}</TableCell>
        <TableCell align="right">{row.topic_2}</TableCell>
        <TableCell align="right">{row.topic_3}</TableCell>
        <TableCell align="right">{row.feedback}</TableCell>
        <TableCell />
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Criterion
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.criterion.map((criterionRow) => (
                    <TableRow key={criterionRow.topic}>
                      <TableCell component="th" scope="row">
                        {criterionRow.topic}
                      </TableCell>
                      <TableCell>{criterionRow.score3}</TableCell>
                      <TableCell>{criterionRow.score2}</TableCell>
                      <TableCell>{criterionRow.score1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> 
    </React.Fragment>
  );
}

const rows = [
  createData('week 1 | Motivation', 159, 6.0, 24, "นักเรียนหิวข้าวมากๆ", 3.99),
  createData('week 1 | Motivation', 237, 9.0, 37, "นักเรียนหิวข้าวมากๆ", 4.99),
  createData('week 1 | Motivation', 262, 16.0, 24, "นักเรียนหิวข้าวมากๆ", 3.79),
  createData('week 1 | Motivation', 305, 3.7, 67, "นักเรียนหิวข้าวมากๆ", 2.5),
  createData('week 1 | Motivation', 356, 16.0, 49, "นักเรียนหิวข้าวมากๆ", 1.5),
];

export default function CollapsibleTable() {
  return 
}
