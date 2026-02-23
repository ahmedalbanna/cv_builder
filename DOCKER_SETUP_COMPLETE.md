# ✅ Ollama Docker Setup - Complete!

## 🎉 Setup Summary

Your Ollama installation has been successfully migrated to Docker! Here's what was done:

### 📦 What Was Removed
- ✅ Stopped and disabled system Ollama service
- ✅ Removed `/usr/local/bin/ollama` binary
- ✅ Removed `/etc/systemd/system/ollama.service`
- ✅ Cleaned up Ollama data directories

### 🐳 What Was Installed
- ✅ **Ollama Docker Container** - Running on port 11434
- ✅ **Open WebUI** - Web interface on port 8080
- ✅ **llama3.2:1b Model** - Fast 1.3GB model for CV generation

---

## 🚀 Services Running

| Service | Status | Port | URL |
|---------|--------|------|-----|
| Ollama API | ✅ Running | 11434 | http://localhost:11434 |
| Open WebUI | ✅ Running | 8080 | http://localhost:8080 |

---

## 📝 Quick Commands

### Manage Services
```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# Restart services
docker compose restart

# View status
docker compose ps

# View logs
docker compose logs ollama -f
docker compose logs open-webui -f
```

### Manage Models
```bash
# List installed models
docker exec ollama ollama list

# Pull a new model
docker exec ollama ollama pull llama3.2:3b
docker exec ollama ollama pull mistral

# Remove a model
docker exec ollama ollama rm llama3.2:1b

# Chat with a model (interactive)
docker exec -it ollama ollama run llama3.2:1b
```

### Test API
```bash
# Check available models
curl http://localhost:11434/api/tags

# Check Ollama version
curl http://localhost:11434/api/version

# Generate text
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:1b",
  "prompt": "Write a professional summary for a software engineer"
}'
```

---

## 🎨 Using with CV Builder

### 1. **Access AI Settings**
   - Open your CV Builder at http://localhost:3000
   - Click the "AI Settings" button in the top toolbar
   - Connection should show as "Connected" (green)

### 2. **Generate Content**
   - **Professional Summary**: Click "Generate with AI" in Personal Info
   - **Job Descriptions**: Click "Generate with AI" when adding work experience
   - **Project Descriptions**: Click "Improve with AI" when adding projects

### 3. **Current Configuration**
   - **Model**: llama3.2:1b (1.3GB, optimized for speed)
   - **API URL**: http://localhost:11434
   - **Status**: Connected ✅

---

## 🌐 Open WebUI Features

Access the web interface at **http://localhost:8080**

Features:
- Chat with any installed model
- Model management (download, remove)
- Conversation history
- System prompts and settings
- Multi-model support
- File uploads and analysis

---

## 🔧 Advanced Configuration

### Use GPU Acceleration (NVIDIA)
If you have an NVIDIA GPU, edit `docker-compose.yml`:

```yaml
services:
  ollama:
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

Then restart:
```bash
docker compose down
docker compose up -d
```

### Change Ollama Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "12345:11434"  # Change 12345 to your preferred port
```

Update CV Builder config in `src/config/ai.ts`:
```typescript
export const OLLAMA_BASE_URL = 'http://localhost:12345'
```

---

## 📊 Model Recommendations

| Model | Size | Use Case | Speed |
|-------|------|----------|-------|
| **llama3.2:1b** | 1.3GB | Quick suggestions, fast responses | ⚡⚡⚡ |
| **llama3.2:3b** | 2GB | Better quality, still fast | ⚡⚡ |
| **llama3:8b** | 4.7GB | High quality content | ⚡ |
| **mistral:7b** | 4.1GB | Great for professional writing | ⚡ |
| **llama2:13b** | 7.4GB | Very high quality (slower) | ⚡ |

Pull additional models:
```bash
docker exec ollama ollama pull <model-name>
```

Update the model in AI Settings panel in the CV Builder.

---

## 🔒 Data Persistence

Your models and data are stored in Docker volumes:
- **ollama_data**: Model files and configurations
- **open-webui_data**: Web UI data and conversations

These persist even if containers are removed. To completely remove:
```bash
docker compose down -v  # WARNING: Deletes all models and data!
```

---

## 🐛 Troubleshooting

### Ollama Not Responding
```bash
# Check logs
docker compose logs ollama

# Restart service
docker compose restart ollama
```

### Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :11434

# Change port in docker-compose.yml
```

### Model Download Failed
```bash
# Check disk space
df -h

# Try pulling again
docker exec ollama ollama pull llama3.2:1b
```

### CV Builder Can't Connect
1. Verify Ollama is running: `docker compose ps`
2. Test API: `curl http://localhost:11434/api/tags`
3. Check browser console for errors
4. Verify model is downloaded: `docker exec ollama ollama list`

---

## 📚 Additional Resources

- **Ollama Documentation**: https://ollama.ai/
- **Open WebUI**: https://github.com/open-webui/open-webui
- **Available Models**: https://ollama.ai/library
- **Docker Compose**: https://docs.docker.com/compose/

---

## 🎯 Next Steps

1. ✅ **Ollama is running** - Start generating CV content!
2. 🌐 **Try Open WebUI** - Visit http://localhost:8080
3. 📝 **Build your CV** - Visit http://localhost:3000
4. 🚀 **Experiment with models** - Try different models for better results

---

**Status**: ✅ All systems operational!
**Created**: 2026-02-23
**Ollama Version**: 0.17.0
