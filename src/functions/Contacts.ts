import { LFunction } from "./LFunction";

interface ContactsState {
    contactIndex: number;
}

export class Contacts implements LFunction<ContactsState> {
    state = {
        contactIndex: 0,
    }

    async onSelect() {
        console.log(`Contacts`);
    }

    async onSwipe(direction: 'UP' | 'DOWN') {
        const dIndex = direction === 'UP' ? 1 : -1;
        this.state.contactIndex = (this.state.contactIndex + contacts.length + dIndex) % contacts.length;
        console.log(`Selected [${contacts[this.state.contactIndex]}]`);
    }

    async onTouchDrag(touchStart, touchNow) {

    }

    async onTap() {
        console.log(`Call [${contacts[this.state.contactIndex]}]`);
    }

    render() {
        return `
CONTACTS
--
Selected Contact: ${contacts[this.state.contactIndex]}
        `;
    }
}

const contacts = [`Joe Reeve`, `Lewis Jones`, `Ed Saperia`];
