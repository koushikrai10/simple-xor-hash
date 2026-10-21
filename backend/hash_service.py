BLOCK_SIZE = 4
MASK_32_BIT = 0xFFFFFFFF


def simple_hash(message):
    """Educational 32-bit XOR hash. Not cryptographically secure."""
    message_bytes = message.encode("utf-8")
    hash_value = 0

    for i in range(0, len(message_bytes), BLOCK_SIZE):
        block = message_bytes[i:i + BLOCK_SIZE].ljust(BLOCK_SIZE, b"\x00")
        block_value = int.from_bytes(block, byteorder="big")
        hash_value = (hash_value ^ block_value) & MASK_32_BIT

    return {
        "hash": f"{hash_value:08X}",
        "message_length": len(message_bytes),
        "block_count": (len(message_bytes) + BLOCK_SIZE - 1) // BLOCK_SIZE
    }
