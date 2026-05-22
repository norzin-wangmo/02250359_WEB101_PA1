// Central error codes (similar to API / HTTP-style codes for viva & future backend)
export const ERROR_CODES = {
  OK: 200,

  // Client / validation (4xxx)
  ERR_VALIDATION_EMPTY: 4001,
  ERR_VALIDATION_PASSWORD: 4002,
  ERR_VALIDATION_EMAIL: 4003,
  ERR_AUTH_REQUIRED: 4010,
  ERR_SEARCH_NO_RESULTS: 4040,
  ERR_MOVIE_NOT_FOUND: 4041,

  // Server / app (5xxx)
  ERR_MOVIES_LOAD: 5001,
  ERR_STORAGE_READ: 5002,
  ERR_STORAGE_WRITE: 5003,
  ERR_VIDEO_PLAY: 5004,
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.OK]: "Success",

  [ERROR_CODES.ERR_VALIDATION_EMPTY]:
    "Email and password are required. (Code 4001)",
  [ERROR_CODES.ERR_VALIDATION_PASSWORD]:
    "Password must be at least 4 characters. (Code 4002)",
  [ERROR_CODES.ERR_VALIDATION_EMAIL]:
    "Please enter a valid email address. (Code 4003)",
  [ERROR_CODES.ERR_AUTH_REQUIRED]:
    "Please sign in to use My List. (Code 4010)",
  [ERROR_CODES.ERR_SEARCH_NO_RESULTS]:
    "No movies match your search. (Code 4040)",
  [ERROR_CODES.ERR_MOVIE_NOT_FOUND]:
    "Movie not found. (Code 4041)",

  [ERROR_CODES.ERR_MOVIES_LOAD]:
    "Failed to load movies. Please refresh. (Code 5001)",
  [ERROR_CODES.ERR_STORAGE_READ]:
    "Could not read saved My List. (Code 5002)",
  [ERROR_CODES.ERR_STORAGE_WRITE]:
    "Could not save My List. (Code 5003)",
  [ERROR_CODES.ERR_VIDEO_PLAY]:
    "Video could not play. Try clicking Play. (Code 5004)",
};

export function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || `Something went wrong. (Code ${code})`;
}
