/*
 * 본 파일에 지정된 값은 개발 환경에서 사용되는 기본값입니다.
 * Production 환경에서는 반드시 Environment Variable 을 통해 적절한 값을 지정하시기 바랍니다.
 */

const v4: object = {
  'jwt': {
    'secret_key': (process.env.HYU_OMS_JWT_SECRET_KEY || 'uEbYw@y3Lh+hSa33'),
    'algorithm': (process.env.HYU_OMS__JWT_ALGORITHM || 'HS512')
  }
};

export {
  v4
};