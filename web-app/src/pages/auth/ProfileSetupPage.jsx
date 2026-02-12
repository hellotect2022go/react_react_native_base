import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { regions } from '../../data/mockData';
import { createUserProfile, uploadImage } from '../../services/api.js';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: ${props => props.theme.background};
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 12px;
  text-align: center;
  flex-shrink: 0;
`;

const Logo = styled.div`
  font-size: 40px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  margin: 0;
  line-height: 1.4;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  flex: 1;
  display: flex;
  min-height: 0;
`;

const Form = styled.form`
  width: 100%;
  background: ${props => props.theme.cardBg};
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 8px 32px ${props => props.theme.shadowStrong};
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.textTertiary};
    border-radius: 3px;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;

const Required = styled.span`
  color: ${props => props.theme.primary};
  margin-left: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.shadow};
  }

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.shadow};
  }

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.shadow};
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.$hasImage 
    ? `url(${props.$imageUrl}) center/cover` 
    : props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  box-shadow: 0 4px 16px ${props => props.theme.shadowStrong};
  overflow: hidden;
  border: 4px solid ${props => props.theme.cardBg};
`;

const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px ${props => props.theme.shadowStrong};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  input {
    display: none;
  }
`;

const UploadIcon = styled.span`
  color: white;
  font-size: 20px;
`;

const ImageNote = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textTertiary};
  text-align: center;
  margin-top: 8px;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 100%;
  margin-top: 12px;
`;

const AvatarButton = styled.button`
  aspect-ratio: 1;
  border: 3px solid ${props => props.$selected ? props.theme.primary : props.theme.border};
  border-radius: 16px;
  background: ${props => props.$selected ? props.theme.gradient : props.theme.inputBg};
  font-size: 32px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${props => props.$over ? '#EF4444' : props.theme.textTertiary};
  margin-top: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: ${props => props.theme.gradient};
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  position: relative;
  z-index: 10;
  pointer-events: auto;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  position: relative;
  z-index: 100;
  background: #FF4444;
  color: #FFF;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
  border: 2px solid #FF0000;
`;

const Info = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textTertiary};
  margin-top: 16px;
  text-align: center;
  line-height: 1.5;
`;

const avatarOptions = ['🦋', '🐱', '🎭', '🌺', '🚗', '✨', '🍇', '😻', '🦉', '🌸', '🌟', '🍒', '🌙', '🎨', '🎵'];

function ProfileSetupPage() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null); // 실제 파일 저장
  
  const [formData, setFormData] = useState({
    nickname: '',
    age: '',
    gender: '',
    region: '',
    bio: '',
    avatar: '👤',
    profileImage: null, // 미리보기 URL
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  // 이미지 업로드 처리 (미리보기만)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      setError('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 실제 파일 저장 (나중에 전송용)
    setImageFile(file);

    // 미리보기 URL 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ 
        ...prev, 
        profileImage: reader.result,
        avatar: '' // 이미지 업로드 시 이모지 초기화
      }));
      console.log('✅ 이미지 미리보기 준비 완료');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    console.log('🔥 handleSubmit 호출됨!', e);
    e.preventDefault();
    e.stopPropagation();
    setError('');

    console.log('📝 현재 폼 데이터:', formData);

    // 유효성 검사
    if (!formData.nickname.trim()) {
      console.log('❌ 닉네임 없음');
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (formData.nickname.length < 2) {
      setError('닉네임은 2글자 이상이어야 합니다.');
      return;
    }

    if (!formData.age || formData.age < 19) {
      setError('19세 이상만 가입 가능합니다.');
      return;
    }

    if (!formData.gender) {
      setError('성별을 선택해주세요.');
      return;
    }

    if (!formData.region) {
      setError('지역을 선택해주세요.');
      return;
    }

    if (!formData.bio.trim()) {
      setError('자기소개를 입력해주세요.');
      return;
    }

    if (formData.bio.length < 10) {
      setError('자기소개는 10글자 이상 작성해주세요.');
      return;
    }

    setLoading(true);
    

    try {
      let uploadedImageUrl = '';
      
      // 1단계: 이미지 파일이 있으면 먼저 업로드
      if (imageFile) {
        console.log('📸 1단계: 이미지 업로드 시작');
        uploadedImageUrl = await uploadImage(imageFile, user.uid);
        console.log('✅ 이미지 업로드 완료:', uploadedImageUrl);
      }
      
      //2단계: 프로필 데이터 준비 (업로드된 이미지 URL 포함)
      const profileDataWithAuth = {
        uid: user.uid,
        refreshToken: user.refreshToken || '',
        nickname: formData.nickname,
        age: formData.age,
        gender: formData.gender,
        region: formData.region,
        bio: formData.bio,
        avatar: formData.avatar,
        profileImage: uploadedImageUrl || formData.profileImage || '', // 업로드된 URL 사용
      };
      
      console.log('📝 2단계: 프로필 데이터 저장 시작');
      const response = await createUserProfile(profileDataWithAuth);
      
      console.log('✅ 백엔드 응답:', response);


      if(response.success) {
        // // 2. 로컬 상태 업데이트 (AuthContext)
        await updateUserProfile(user.uid, {
          ...formData,
          profileImage: response.user?.profileImage || formData.profileImage, // 서버에서 받은 이미지 URL 사용
          profileComplete: true,
        });
        console.log('✅ 프로필 저장 완료!');
        
        // 메인 화면으로 이동
        window.location.reload();
      }
      
    } catch (err) {
      console.error('❌ 프로필 저장 실패:', err);
      setError(err.message || '프로필 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Logo>✨</Logo>
        <Title>프로필 설정</Title>
        <Subtitle>
          매력적인 프로필을 만들어보세요
        </Subtitle>
      </Header>

      

      <FormWrapper>
        <Form onSubmit={(e) => {
          console.log('📝 Form onSubmit 호출됨');
          handleSubmit(e);
        }}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* 프로필 이미지 업로드 */}
        <AvatarSection>
          <Label>프로필 이미지<Required>*</Required></Label>
          
          <ProfileImageWrapper>
            <ProfileImage 
              $hasImage={formData.profileImage}
              $imageUrl={formData.profileImage}
            >
              {!formData.profileImage && formData.avatar}
            </ProfileImage>
            <UploadButton>
              <UploadIcon>📷</UploadIcon>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
            </UploadButton>
          </ProfileImageWrapper>

          <ImageNote>
            {uploadingImage ? '업로드 중...' : '이미지를 클릭하여 업로드하거나 아래 이모지를 선택하세요'}
          </ImageNote>

          <AvatarGrid>
            {avatarOptions.map(avatar => (
              <AvatarButton
                key={avatar}
                type="button"
                $selected={formData.avatar === avatar && !formData.profileImage}
                onClick={() => {
                  handleChange('avatar', avatar);
                  handleChange('profileImage', null); // 이모지 선택 시 이미지 초기화
                }}
                disabled={uploadingImage}
              >
                {avatar}
              </AvatarButton>
            ))}
          </AvatarGrid>
        </AvatarSection>

        {/* 닉네임 */}
        <Section>
          <Label>닉네임<Required>*</Required></Label>
          <Input
            type="text"
            placeholder="멋진 닉네임을 입력하세요"
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
            maxLength={15}
          />
          <CharCount $over={formData.nickname.length > 15}>
            {formData.nickname.length}/15
          </CharCount>
        </Section>

        {/* 나이 */}
        <Section>
          <Label>나이<Required>*</Required></Label>
          <Input
            type="number"
            placeholder="19"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            min="19"
            max="99"
          />
        </Section>

        {/* 성별 */}
        <Section>
          <Label>성별<Required>*</Required></Label>
          <Select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </Select>
        </Section>

        {/* 지역 */}
        <Section>
          <Label>지역<Required>*</Required></Label>
          <Select
            value={formData.region}
            onChange={(e) => handleChange('region', e.target.value)}
          >
            <option value="">선택하세요</option>
            {regions.filter(r => r !== '전체').map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </Select>
        </Section>

        {/* 자기소개 */}
        <Section>
          <Label>자기소개<Required>*</Required></Label>
          <Textarea
            placeholder="자신을 매력적으로 표현해보세요 💕&#10;예) 밤에만 활동하는 올빼미입니다 ✨ (10글자이상)"
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            maxLength={100}
          />
          <CharCount $over={formData.bio.length > 100}>
            {formData.bio.length}/100
          </CharCount>
        </Section>

        <Button 
          type="button"
          disabled={loading}
          onClick={(e) => {
            console.log('🖱️ 버튼 클릭됨!', e);
            handleSubmit(e);
          }}
        >
          {loading ? '저장 중...' : '프로필 완성하기 🎉'}
        </Button>

        <Info>
          💡 모든 항목은 필수입니다<br />
          나중에 설정에서 수정할 수 있어요
        </Info>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default ProfileSetupPage;
