using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VotingBackend.Migrations
{
    /// <inheritdoc />
    public partial class Version2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vote");

            migrationBuilder.CreateTable(
                name: "voter",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    address_voter = table.Column<string>(type: "text", nullable: false),
                    list_vote = table.Column<List<string>>(type: "text[]", nullable: false),
                    votingIdid = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_voter", x => x.id);
                    table.ForeignKey(
                        name: "FK_voter_voting_votingIdid",
                        column: x => x.votingIdid,
                        principalTable: "voting",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_voter_votingIdid",
                table: "voter",
                column: "votingIdid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "voter");

            migrationBuilder.CreateTable(
                name: "Vote",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    votingIdid = table.Column<string>(type: "text", nullable: false),
                    address_voter = table.Column<string>(type: "text", nullable: false),
                    list_vote = table.Column<List<string>>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vote", x => x.id);
                    table.ForeignKey(
                        name: "FK_Vote_voting_votingIdid",
                        column: x => x.votingIdid,
                        principalTable: "voting",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vote_votingIdid",
                table: "Vote",
                column: "votingIdid");
        }
    }
}
