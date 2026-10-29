import test from 'node:test';import assert from 'node:assert/strict';
function validPickup(start,end,expiry){return new Date(end)>new Date(start)&&new Date(end)<=new Date(expiry)}
function canRequest(requested,available){return Number.isInteger(requested)&&requested>0&&requested<=available}
function transition(from,to){return (from==='pending'&&['accepted','rejected','cancelled'].includes(to))||(from==='accepted'&&['picked_up','cancelled'].includes(to))}
test('pickup window must end after it starts',()=>assert.equal(validPickup('2026-01-01T12:00:00Z','2026-01-01T11:00:00Z','2026-01-01T13:00:00Z'),false));
test('pickup window must end before expiry',()=>assert.equal(validPickup('2026-01-01T12:00:00Z','2026-01-01T14:00:00Z','2026-01-01T13:00:00Z'),false));
test('requested quantity cannot exceed available quantity',()=>assert.equal(canRequest(12,10),false));
test('request status transitions are constrained',()=>{assert.equal(transition('pending','accepted'),true);assert.equal(transition('picked_up','accepted'),false)});
