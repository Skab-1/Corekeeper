// Constants for resource types and their initial health
const resources = [
  { type: 'rock', health: 3, loot: 'stone' },
  { type: 'tree', health: 2, loot: 'wood' },
  { type: 'crop', health: 1, loot: 'wheat' }
];

// Generate the game grid
const gameContainer = document.getElementById('game-container');
const gridSize = 10; // 10x10 grid
const inventory = {}; // Player's inventory

// Helper to update inventory
function addToInventory(item) {
  if (!inventory[item]) inventory[item] = 0;
  inventory[item]++;
  console.log(`Inventory: ${JSON.stringify(inventory)}`);
}

// Create grid cells with random resources
for (let i = 0; i < gridSize * gridSize; i++) {
  const cell = document.createElement('div');
  const resource = Math.random() > 0.5 ? resources[Math.floor(Math.random() * resources.length)] : null;

  cell.className = 'grid-cell';
  if (resource) {
    cell.classList.add(resource.type);
    cell.dataset.type = resource.type;
    cell.dataset.health = resource.health;
    cell.textContent = resource.type.charAt(0).toUpperCase(); // Display first letter
  }

  // Handle clicks to gather resources
  cell.addEventListener('click', () => {
    if (resource) {
      const currentHealth = parseInt(cell.dataset.health);
      if (currentHealth > 1) {
        cell.dataset.health = currentHealth - 1;
        console.log(`Damaged ${resource.type}, health left: ${cell.dataset.health}`);
      } else {
        // Resource destroyed
        addToInventory(resource.loot);
        cell.className = 'grid-cell'; // Reset cell
        cell.textContent = '';
        cell.removeEventListener('click', arguments.callee); // Remove event listener
        console.log(`Collected ${resource.loot}!`);
      }
    }
  });

  gameContainer.appendChild(cell);
}
