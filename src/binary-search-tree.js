const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

	constructor() {
		this._root = null;
	}

	root() {
		return this._root;
	}

	add(data) {
		this._root = addInside(this._root, data);
		function addInside(node, data) {
			if (!node) {
				return new Node(data);
			}
			if (node.data === data) {
				return node;
			}
			if (data < node.data) {
				node.left = addInside(node.left, data);
			} else {
				node.right = addInside(node.right, data);
			}
			return node;
		}
	}

	has(data) {
		return Boolean(this.find(data));
	}

	find(data) {
		return searchInside(this._root, data);
		function searchInside(node, data) {
			if (!node) {
				return null;
			}
			if (data < node.data) {
				return searchInside(node.left, data);
			} else if (data > node.data) {
				return searchInside(node.right, data);
			} else {
				return node;
			}
		}
	}

	remove(data) {
		this._root = removeNode(this._root, data);
		function removeNode(node, data) {
			if (!node) {
				return null;
			}
			if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else if (data > node.data) {
				node.right = removeNode(node.right, data);
				return node;
			}
			if (!node.left) {
				return node.right;
			}
			if (!node.right) {
				return node.left;
			}
			let minRight = node.right;
			while (minRight.left) {
				minRight = minRight.left;
			}
			node.data = minRight.data;
			node.right = removeNode(node.right, minRight.data);
			return node;
		}
	}

	min() {
		if (!this._root) {
			return;
		}
		let node = this._root;
		while (node.left) {
			node = node.left;
		}
		return node.data;
	}

	max() {
		if (!this._root) {
			return;
		}
		let node = this._root;
		while (node.right) {
			node = node.right;
		}
		return node.data;
	}
}

module.exports = {
	BinarySearchTree
};