#!/bin/bash
# Ollama Docker Management Commands

echo "=== Ollama Docker Management Commands ==="
echo ""

# Start services
echo "Start Ollama and Open WebUI:"
echo "  docker compose up -d"
echo ""

# Stop services
echo "Stop services:"
echo "  docker compose down"
echo ""

# View logs
echo "View Ollama logs:"
echo "  docker compose logs ollama -f"
echo ""

# List models
echo "List installed models:"
echo "  docker exec ollama ollama list"
echo ""

# Pull a model
echo "Pull a new model (e.g., llama3.2:1b):"
echo "  docker exec ollama ollama pull llama3.2:1b"
echo ""

# Remove a model
echo "Remove a model:"
echo "  docker exec ollama ollama rm <model-name>"
echo ""

# Run a model interactively
echo "Chat with a model:"
echo "  docker exec -it ollama ollama run llama3.2:1b"
echo ""

# Check Ollama API
echo "Test Ollama API:"
echo "  curl http://localhost:11434/api/tags"
echo ""

# Open WebUI access
echo "Access Open WebUI:"
echo "  http://localhost:8080"
echo ""

# Container status
echo "Check container status:"
echo "  docker compose ps"
echo ""

# Restart services
echo "Restart services:"
echo "  docker compose restart"
echo ""
