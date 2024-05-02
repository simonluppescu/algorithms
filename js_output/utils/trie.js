import assert from "./assert.js";
class Trie {
    root;
    constructor(words) {
        this.root = new TrieNode({ isRoot: true });
        if (words !== undefined) {
            this.add(words);
        }
    }
    add(words) {
        words.forEach((word) => {
            this.root.add(word);
        });
    }
    isWord(word) {
        let result = false;
        for (let node of Object.values(this.root.next)) {
            result ||= node.search(word);
        }
        return result;
    }
    print() {
        console.log("PRINTING -----");
        this.root.print();
    }
}
class TrieNode {
    next;
    letter;
    constructor(opts) {
        this.next = {};
        if (opts?.isRoot) {
            this.letter = ">";
        }
        else if (opts?.isTerminated) {
            this.letter = "*";
        }
    }
    add(word) {
        if (word === "")
            throw "Cannot add empty string";
        const firstLetter = word[0];
        const nextLetter = word[1];
        if (this.letter === ">") {
            this.next[firstLetter] ||= new TrieNode();
            this.next[firstLetter].add(word);
            return;
        }
        this.letter = firstLetter;
        if (nextLetter === undefined) {
            this.next["*"] = new TrieNode({ isTerminated: true });
        }
        else {
            this.next[nextLetter] ||= new TrieNode();
            this.next[nextLetter].add(word.slice(1));
        }
    }
    search(word) {
        const firstLetter = word[0];
        if (firstLetter === undefined && this.letter === "*") {
            return true;
        }
        if (firstLetter === this.letter) {
            let result = false;
            for (let node of Object.values(this.next)) {
                result ||= node.search(word.slice(1));
            }
            return result;
        }
        else {
            return false;
        }
    }
    print() {
        console.log(this.letter);
        for (let letter in this.next) {
            this.next[letter].print();
        }
    }
}
const trie = new Trie(["hi", "ho", "foo"]);
// trie.print();
trie.add(["bar", "bat", "b", "boo"]);
// trie.print();
assert(trie.isWord("hi"));
assert(!trie.isWord("ald"));
assert(!trie.isWord("ba"));
assert(trie.isWord("bar"));
assert(trie.isWord("b"));
const trie2 = new Trie([
    "hello",
    "help",
    "nation",
    "national",
    "nationality",
    "antidisestablishmentarianism"
]);
// trie2.print();
assert(trie2.isWord("hello"));
assert(!trie2.isWord("nationa"));
assert(trie2.isWord("national"));
assert(!trie2.isWord("antidisestablishmentarinism"));
assert(trie2.isWord("antidisestablishmentarianism"));
assert(!trie2.isWord("alkshlaiselnaskjdhfalskdfjalskjdf"));
console.log("All assertions passed.");
