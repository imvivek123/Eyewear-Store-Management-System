# Eyewear Store Management System - Development

## Quick Start

### Backend
```bash
cd server
npm install
npm run seed
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Docker
```bash
docker-compose up --build
```

## Default Credentials
- Store: `store_user` / `store123`
- HQ: `hq_admin` / `hq123`

## API Documentation
See README.md for full API endpoint documentation.

## Troubleshooting

### Database not initializing
- Remove `server/database.sqlite` and restart the server
- Run `npm run seed` manually in the server directory

### Port already in use
- Change PORT in `.env` file or docker-compose.yml
- Kill existing process: `lsof -i :5000` then `kill -9 <PID>`

### CORS errors
- Ensure backend server is running on port 5000
- Check that API URL in `client/src/services/api.js` is correct

---

Happy development! 🚀
