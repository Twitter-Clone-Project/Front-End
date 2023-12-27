import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { EditorState, ContentState } from 'draft-js';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import AddPost from '../../tweetPage/AddPost';

vi.mock('@draft-js-plugins/editor', () => ({
  default: vi.fn((props) => {
    const mockedonchange = (e) => {
      const content = ContentState.createFromText(e.target.value);
      props.onChange(EditorState.createWithContent(content));
    };
    return (
      <input
        data-testid="editor"
        onChange={(e) => mockedonchange(e)}
      />
    );
  }),
}));

const user = {
  userId: '123',
  username: 'janesmith',
  screenName: 'Jane Smith',
  imageUrl: 'https://example.com/profile.jpg',
  bio: "I'm the original user.",
  followersCount: 2000,
  followingCount: 1000,
  isFollowed: true,
  isFollowing: true,
};
useAuth.mockReturnValue({
  dispatch: vi.fn(),
  isAuthenticated: true,
  user: user,
});
vi.mock('../../hooks/AuthContext.js');
const navigate = vi.fn();
const setTweets = vi.fn();
const dispatch = vi.fn();
beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  vi.spyOn(window, 'fetch');
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  window.fetch.mockRestore();
});
describe('Add Post', () => {
  it('navigates to the profile on click on the profile picture', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );

    const imageElement = getByTestId(`profileImage`);
    fireEvent.click(imageElement);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      `/app/${user.username}`,
      expect.any(Object),
    );
  });

  it('shows the emoji picker on click on emoji icon', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );

    const emojiBtn = getByTestId('emojiBtn');
    fireEvent.click(emojiBtn);
    expect(getByTestId('emojiPicker')).toBeInTheDocument();
  });

  it('should not disable post button in case of some text', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const postBtn = getByTestId('post123');
    expect(postBtn).toBeDisabled();
    const input = getByTestId('editor');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');
    expect(postBtn).not.toBeDisabled();
  });

  it('should not disable post button in case of hashtags', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const postBtn = getByTestId('post123');
    expect(postBtn).toBeDisabled();
    const input = getByTestId('editor');
    fireEvent.change(input, { target: { value: '#new #value' } });
    expect(input.value).toBe('#new #value');
    expect(postBtn).not.toBeDisabled();
  });
  it('should disable post button in case of no text', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const postBtn = getByTestId('post123');
    expect(postBtn).toBeDisabled();
    const input = getByTestId('editor');
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    expect(postBtn).toBeDisabled();
  });

  it('should disable post button in case of newlines', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const postBtn = getByTestId('post123');
    expect(postBtn).toBeDisabled();
    const input = getByTestId('editor');
    fireEvent.change(input, { target: { value: '\n\n' } });
    expect(postBtn).toBeDisabled();
  });
  it('should disable post button in case of spaces', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const postBtn = getByTestId('post123');
    expect(postBtn).toBeDisabled();
    const input = getByTestId('editor');
    fireEvent.change(input, { target: { value: '  ' } });
    expect(postBtn).toBeDisabled();
  });

  it('should send a request to add tweet', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const postBtn = getByTestId('post123');
    const input = getByTestId('editor');
    fireEvent.change(input, { target: { value: 'some tweet' } });
    fireEvent.click(postBtn);
    const formData = new FormData();
    formData.append('tweetText', 'some tweet');
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}tweets/add`,
        expect.objectContaining({
          method: 'POST',
          body: formData,
          credentials: 'include',
          withCredentials: true,
        }),
      );
    });
  });

  it('should remove the video on click on remove button ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'video1.mp4', { type: 'video/mp4' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(1);
    const media = getByTestId('media');
    expect(media).toBeInTheDocument();
    const remove = getByTestId('remove');
    expect(remove).toBeInTheDocument();
    fireEvent.click(remove);
    expect(remove).not.toBeInTheDocument();
  });
  it('should remove the image on click on remove button ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image/png' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(1);
    expect(mediaInput).not.toBeDisabled();
    const media = getByTestId('media');
    expect(media).toBeInTheDocument();
    const remove = getByTestId('remove');
    expect(remove).toBeInTheDocument();
    fireEvent.click(remove);
    expect(remove).not.toBeInTheDocument();
  });
  it('should remove the image on click on remove button in case of 2 images ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image/png' }),
      new File(['file content'], 'image1.png', { type: 'image/png' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(2);
    expect(mediaInput).not.toBeDisabled();
    const media = getByTestId('media');
    expect(media).toBeInTheDocument();
    const remove = getByTestId(`remove20`);
    expect(remove).toBeInTheDocument();
    fireEvent.click(remove);
    expect(remove).not.toBeInTheDocument();
  });

  it('should remove the image on click on remove button in case of 3 images ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image/png' }),
      new File(['file content'], 'image1.png', { type: 'image/png' }),
      new File(['file content'], 'image1.png', { type: 'image/png' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(3);
    expect(mediaInput).not.toBeDisabled();
    const media = getByTestId('media');
    expect(media).toBeInTheDocument();
    const remove = getByTestId(`remove30`);
    expect(remove).toBeInTheDocument();
    fireEvent.click(remove);
    expect(remove).not.toBeInTheDocument();
  });

  it('should not disable media button in case of no images or videos', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(0);
    expect(mediaInput).not.toBeDisabled();
  });
  it('should not disable media button in case of image and video because it will get none', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image1/png' }),
      new File(['file content'], 'video.mp4', { type: 'video/mp4' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(2);
    expect(mediaInput).not.toBeDisabled();
  });
  it('should not disable media button in case of 5 images because it will get none', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image1/png' }),
      new File(['file content'], 'image2.png', { type: 'image2/png' }),
      new File(['file content'], 'image3.png', { type: 'image3/png' }),
      new File(['file content'], 'image4.png', { type: 'image4/png' }),
      new File(['file content'], 'image5.png', { type: 'image5/png' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(5);
    expect(mediaInput).not.toBeDisabled();
  });

  it('should not disable media button in case of less than 4 images ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image/png' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(1);
    expect(mediaInput).not.toBeDisabled();
  });

  it('should not disable media button in case of less than 4 images ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    window.URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
    const files = [
      new File(['file content'], 'image1.png', { type: 'image/png' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(1);
    expect(mediaInput).not.toBeDisabled();
  });

  it('should disable media button after 4 images ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    const files = [
      new File(['file content'], 'image1.png', { type: 'image/png' }),
      new File(['file content'], 'image2.jpg', { type: 'image/jpeg' }),
      new File(['file content'], 'image1.png', { type: 'image/png' }),
      new File(['file content'], 'image2.jpg', { type: 'image/jpeg' }),
    ];
    fireEvent.change(mediaInput, {
      target: { files: files },
    });
    expect(mediaInput.files.length).toBe(4);
    expect(mediaInput).toBeDisabled();
  });

  it('should disable media button after 1 video ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mediaInput = getByTestId(`mediaInput${user.userId}`);
    expect(mediaInput).not.toBeDisabled();
    const video = new File(['file content'], 'video1.mp4', {
      type: 'video/mp4',
    });
    fireEvent.change(mediaInput, {
      target: { files: [video] },
    });
    expect(mediaInput.files.length).toBe(1);
    expect(mediaInput).toBeDisabled();
  });
});
