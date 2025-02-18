import { Col, Modal, Row, Form, Input, Select, Button, message, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { updateMovie } from "../../api/movies";
import { deleteMovie } from "../../api/movies";
import { useNavigate } from "react-router-dom";

const MovieInfo = ({ movieInfoOpen, setMovieInfoOpen, selectedMovie, onMovieUpdate }) => {

  const navigate = useNavigate();

  const handleOk = () => {
    setMovieInfoOpen(false);
  };
  const handleCancel = () => {
    setMovieInfoOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this movie?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const response = await deleteMovie(selectedMovie._id);
        setMovieInfoOpen(false);
        message.success("Movie deleted successfully!");
        onMovieUpdate();
        console.log(response);
      },
    });
  };

  const onFinish = async (values) => {
    console.log(values);
    const response = await updateMovie(selectedMovie._id, values);
    setMovieInfoOpen(false);
    message.success('Changes saved successfully!');
    onMovieUpdate();
    console.log(response);
  }

  return (
    <>
      <Modal id={selectedMovie?._id} title={selectedMovie?.title || 'Movie Details'} open={movieInfoOpen} width={800} footer={null} onCancel={handleCancel}>
        <Flex justify="end" align="center" gap='small'>
          <Button danger type="primary"
            style={{ fontSize: "1rem", fontWeight: "600" }}
            onClick={handleDelete}>
            Delete this movie
          </Button>
          <Button color="blue" variant="outlined" onClick={() => window.open(`/add-show-by-movie/${selectedMovie._id}/${encodeURIComponent(selectedMovie.title)}`, '_blank')}
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >Add new show</Button>
        </Flex>

        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onFinish}
          initialValues={{
            title: selectedMovie?.title,
            description: selectedMovie?.description,
            duration: selectedMovie?.duration,
            language: selectedMovie?.language,
            releaseDate: selectedMovie?.releaseDate,
            genre: selectedMovie?.genre,
            poster: selectedMovie?.poster,
            bannerPoster: selectedMovie?.bannerPoster
          }}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Form.Item
                label="Movie Name"
                htmlFor="title"
                name="title"
                className="d-block"
                rules={[{ required: true, message: "Movie name is required!" }]}
              >
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter the movie name"
                ></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Description"
                htmlFor="description"
                name="description"
                className="d-block"
                rules={[{ required: true, message: "Description is required!" }]}
              >
                <TextArea
                  id="description"
                  rows="4"
                  placeholder="Enter the  description"
                ></TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Movie  Duration (in min)"
                    htmlFor="duration"
                    name="duration"
                    className="d-block"
                    rules={[
                      { required: true, message: "Movie duration  is required!" },
                    ]}
                  >
                    <Input
                      id="duration"
                      type="number"
                      placeholder="Enter the movie duration"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Select Movie Language"
                    htmlFor="language"
                    name="language"
                    className="d-block"
                    rules={[
                      { required: true, message: "Movie language  is required!" },
                    ]}
                  >
                    <Select
                      id="language"
                      style={{ width: "100%", height: "45px" }}
                      onChange={handleChange}
                      options={[
                        { value: "English", label: "English" },
                        { value: "Hindi", label: "Hindi" },
                        { value: "Punjabi", label: "Punjabi" },
                        { value: "Telugu", label: "Telugu" },
                        { value: "Bengali", label: "Bengali" },
                        { value: "German", label: "German" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Release date of movie"
                    htmlFor="releaseDate"
                    name="releaseDate"
                    className="d-block"
                    rules={[
                      {
                        required: true,
                        message: "Movie Release Date is required!",
                      },
                    ]}
                  >
                    <Input
                      id="releaseDate"
                      type="date"
                      placeholder="Choose the release date"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Select Movie Genre"
                    htmlFor="genre"
                    name="genre"
                    className="d-block"
                    rules={[
                      { required: true, message: "Movie genre  is required!" },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      options={[
                        { value: "Action", label: "Action" },
                        { value: "Comedy", label: "Comedy" },
                        { value: "Horror", label: "Horror" },
                        { value: "Love", label: "Love" },
                        { value: "Patriot", label: "Patriot" },
                        { value: "Bhakti", label: "Bhakti" },
                        { value: "Thriller", label: "Thriller" },
                        { value: "Mystery", label: "Mystery" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Poster  URL"
                    htmlFor="poster"
                    name="poster"
                    className="d-block"
                    rules={[
                      { required: true, message: "Movie Poster  is required!" },
                    ]}
                  >
                    <Input
                      id="poster"
                      type="text"
                      placeholder="Enter the poster URL"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Banner Poster"
                    htmlFor="bannerPoster"
                    name="bannerPoster"
                    className="d-block"
                    rules={[{ required: true, message: "Banner Poster is required!" }]}
                  >
                    <Input
                      id="bannerPoster"
                      rows="4"
                      placeholder="Paste the URL for banner poster."
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Weekend Only"
                    htmlFor="weekendOnly"
                    name="weekendOnly"
                    className="d-block"
                    initialValue={false}
                    rules={[
                      { required: false },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      options={[
                        { value: false, label: "false" },
                        { value: true, label: "true" }
                      ]}
                    />
                  </Form.Item>
                  </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Flex justify="center" align="center" gap='small'>

              <Button
                block
                style={{ fontSize: "1rem", fontWeight: "600" }}
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Save all changes
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MovieInfo;