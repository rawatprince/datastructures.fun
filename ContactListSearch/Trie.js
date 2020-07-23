export { Trie }

class TrieNode{
    constructor(){
        this.children = Array(10).fill(null);
        this.parent = null;
    }
}

class ContactNode{
    constructor(name, number, parent){
        this.name = name;
        this.number = number;
        this.parent = parent;
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
        this.current = this.root;

        let init = [
            ["Mom", "123456"],
            ["Dad", "123546"],
            ["GF", "123654"],
            ["BF", "123465"]
        ];

        for(let i=0;i<init.length;i++){
            this.add(init[i][1], init[i][0], 0);
        }
    }

    add(number, name, pos = 0, node = this.root){

        if(pos===number.length-1){
            node.children[number[pos]-'0'] = new ContactNode(name, number, node);
            return;
        }

        if(node.children[number[pos]-'0']===null){
            let newnode = new TrieNode();
            node.children[number[pos]-'0'] = newnode;
            newnode.parent = node;
        }
        this.add(number, name, pos+1, node.children[number[pos]-'0']);
    }

    findAll(node){
        // Contact leaf node
        if(node===null)
            return;

        if(node instanceof ContactNode){
            this.res.push(node);
            return;
        }

        for(let i=0;i<10;i++){
            this.findAll(node.children[i]);
        }
    }

    findNext(step){
        // -1, we goto parent (pressed backspace key)
        if (step === -1) {
            this.current = this.current.parent;
        } else if (step !== -2) { // -2  go to xth child of current node and incase if child doesnt exist we'll create child..
            if (this.current.children[step - '0'] === null) {
                let newNode = new TrieNode();
                this.current.children[step - '0'] = newNode;
                newNode.parent = this.current;
            }
            this.current = this.current.children[step - '0'];
        }

        this.res = [];
        this.findAll(this.current);
        return this.res;
    }

    del(number, pos = 0, node = this.root){
        if(pos===number.length-1){
            node.children[number[pos]-'0'] = null;
            return;
        }

        if(node.children[number[pos]-'0']===null){
            let newnode = new TrieNode();
            node.children[number[pos]-'0'] = newnode;
            newnode.parent = node;
        }
        this.del(number, pos+1, node.children[number[pos]-'0']);
    }
}