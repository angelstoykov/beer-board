import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Board = ({
  _id,
  name,
  isActive,
  beersCount,
  imageSrc,
  participants,
  description,

}) => {
  return (
    <Card style={{ margin: 'auto', width: '50%', paddingBottom: '30px', marginBottom: '20px' }}>
      <Card.Img style={{ width: '203px' }} variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{beersCount} on the board</Card.Text>
        <Link to={{ pathname: `/details/board/${_id}` }} style={{ marginLeft: '10px' }}><Button variant='primary'>Details</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default Board;